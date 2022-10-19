import { resolve } from 'path'
import { readdirSync } from 'fs'

import dotenv from 'dotenv'
import { BuildOptions, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as process from 'process'

dotenv.config()

function envPreCheck() {
  if (!process.env.ORG || !process.env.REPO) {
    console.error('ORG and REPO must be set in .env')
    console.error('You can copy .env.example to .env and modify it')
    process.exit(1)
  }
  process.env.HOST ||= 'https://api.github.com'
  process.env.TITLE ||= 'Meme'
}

envPreCheck()

function genMemes(path: string): [memes: Meme[], otherDirs: string[]] {
  const dirs = readdirSync(path)
  const titles = dirs.filter(dir => dir.startsWith('['))
  return [
    titles.map(dir => {
      const [id, title] = /^\[(\d+)]\[(.*)]$/.exec(dir)!.slice(1)
      return {
        id: Number(id),
        title,
        description: title,
        srcList: readdirSync(resolve(path, dir)).map(src => `${path}/${dir}/${src}`)
      }
    }),
    dirs.filter(dir => !dir.startsWith('['))
  ]
}
function allMemes() {
  const ORG = process.env.ORG!
  const REPO = process.env.REPO!

  // 解决 fork 出来的仓库，可能的冲突问题
  let path = 'memes'
  if (ORG !== 'meme-libs') {
    path += `/${ORG}`
  }
  if (REPO !== 'meme') {
    path += `/${REPO}`
  }
  const [memes, otherDirs] = genMemes(path)
  if (ORG === 'meme-libs' && REPO === 'meme') {
    (function resolveOtherDirs(otherDirs: string[]) {
      if (otherDirs.length === 0) return
      otherDirs.forEach(dir => {
        const [dirMemes, otherDirs] = genMemes(resolve(path, dir))
        memes.push(...dirMemes)
        resolveOtherDirs(otherDirs)
      })
    })(otherDirs)
  }
  return memes
}

const rollupOptions: BuildOptions['rollupOptions'] = {
  input: {
    index: resolve(__dirname, './pages/index.html')
  }
}

export default defineConfig({
  root: 'pages',
  base: `/${process.env.REPO}/`,
  define: {
    __MEMES: allMemes(),
    __TITLE: JSON.stringify(process.env.TITLE),
    __REPO: JSON.stringify(process.env.REPO),
    __HOST: JSON.stringify(process.env.NODE_ENV === 'production'
      ? process.env.HOST
      : '/github-api'),
    __ORG: JSON.stringify(process.env.ORG)
  },
  resolve: {
    alias: {
      '@': resolve('pages')
    }
  },
  build: { rollupOptions },
  plugins: [ vue() ],
  server: {
    proxy: {
      '/github-api': {
        target: process.env.HOST,
        changeOrigin: true,
        headers: {
          ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {})
        },
        rewrite: path => path.replace(/^\/github-api/, '')
      }
    }
  }
})
