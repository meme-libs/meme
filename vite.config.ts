import { resolve } from 'path'
import { readdirSync } from 'fs'

import { BuildOptions, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

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
      // @ts-ignore
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
    MEMES: allMemes()
  },
  build: { rollupOptions },
  plugins: [ vue() ]
})
