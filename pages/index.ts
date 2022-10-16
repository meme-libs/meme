import './index.scss'

import { createApp } from 'vue'

import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import App from './App.vue'
import { router } from './router'

const app = createApp(App)

app.config.globalProperties = {
  MEMES: window.MEMES, TITLE: window.TITLE
}

document.title = TITLE

app
  .use(router)
  .mount('#app')
