declare const __MEMES: any
declare const __TITLE: any
declare const __REPO: any
declare const __HOST: any
declare const __ORG: any

export const defines = {
  MEMES: __MEMES,
  TITLE: __TITLE,
  REPO: __REPO,
  HOST: __HOST,
  ORG: __ORG
}

Object.assign(window, defines)
