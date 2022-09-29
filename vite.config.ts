import { defineConfig } from 'vite'
import * as fs from 'fs'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function allMemes() {
  return fs.readdirSync('./public/memes')
}

export default defineConfig({
  publicDir: 'public'
})
