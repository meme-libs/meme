import { BuildOptions, defineConfig } from 'vite'
import { resolve } from 'path'
import { readdirSync } from 'fs'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function allMemes() {
  return readdirSync('./public/memes')
}

const rollupOptions: BuildOptions['rollupOptions'] = {
  input: {
    index: resolve(__dirname, './pages/index.html')
  }
}

export default defineConfig({
  root: './pages',
  build: { rollupOptions },
  publicDir: 'public'
})
