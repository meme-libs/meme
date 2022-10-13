import './index.scss'

import { createApp } from 'vue'
import 'element-plus/dist/index.css'

import App from './App.vue'

const app = createApp(App)

app.config.globalProperties = {
  // @ts-ignore
  MEMES: MEMES
}

app
  .mount('#app')
