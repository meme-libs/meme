import './index.sass'
import html from './utils/html'
import { Footer, Gallery, Header } from './components'

html.render(
  document.querySelector<HTMLElement>('#app')!, [
    Header(),
    Gallery(),
    Footer()
  ]
)
