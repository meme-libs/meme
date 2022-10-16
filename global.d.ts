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
