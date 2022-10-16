export declare global {
  export interface Meme {
    id: number
    title: string
    description: string
    srcList: string[]
  }
  export declare const MEMES: Meme[]
  export declare const ORG: string
  export declare const REPO: string
  export declare const HOST: string
  export interface Window {
    MEMES: Meme[]
    ORG: typeof ORG
    REPO: typeof REPO
    HOST: typeof HOST
  }
}
