import './index.scss'
import { defines } from './env.init'

import { createApp } from 'vue'

import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import App from './App.vue'
import { router } from './router'

const app = createApp(App)

app.config.globalProperties = {
  ...defines
}

document.title = TITLE

app
  .use(router)
  .mount('#app')
