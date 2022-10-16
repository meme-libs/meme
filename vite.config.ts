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

function allMemes() {
  const memesDir = resolve(__dirname, './memes')
  return readdirSync(memesDir)
    .map(dir => {
      const [id, title] = /^\[(\d+)]\[(.*)]$/.exec(dir)!.slice(1)
      return {
        id: Number(id),
        title,
        description: title,
        srcList: readdirSync(resolve(memesDir, dir)).map(src => `memes/${dir}/${src}`)
      } as Meme
    })
}

const rollupOptions: BuildOptions['rollupOptions'] = {
  input: {
    index: resolve(__dirname, './pages/index.html')
  }
}

export default defineConfig({
  root: './pages',
  publicDir: 'public',
  define: {
    MEMES: allMemes(),
    ORG: JSON.stringify(process.env.ORG),
    REPO: JSON.stringify(process.env.REPO),
    HOST: JSON.stringify(process.env.HOST),
    TITLE: JSON.stringify(process.env.TITLE)
  },
  resolve: {
    alias: {
      '@': resolve('pages')
    }
  },
  build: { rollupOptions },
  plugins: [ vue() ]
})
