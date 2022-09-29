import { defineConfig } from 'vite'
import { resolve } from 'path'
import { readdirSync } from 'fs'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function allMemes() {
  return readdirSync('./public/memes')
}

const rollupOptions = {
  input: {
    main: resolve(__dirname, './pages/index.html')
  }
}

export default defineConfig({
  publicDir: 'public',
  build: { rollupOptions }
})
