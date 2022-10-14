/// <reference types="vite/client.d.ts" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

export declare global {
  export interface Meme {
    id: number
    title: string
    description: string
    srcList: string[]
  }
  export declare const MEMES: Meme[]
  export interface Window {
    MEMES: Meme[]
  }
}
