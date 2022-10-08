import './gallery.scss'

import html from '../utils/html'

const Image = (props: {
  title?: string
  images: string[]
  description?: string
}) => html`
  <div class="item">
    <div class="imgs">
      <span class="count">
        <span class="material-icons" style="font-size: 14px">photo_library</span>
        ${props.images.length}
      </span>
      <span class="material-icons icon l-btn">chevron_left</span>
      <span class="material-icons icon r-btn">chevron_right</span>
      <div class="mask"></div>
      ${props.images.map(src => html`<img src="${src}" alt="这是一张图"/>`)}
    </div>
    <h3 class="title">${props.title}</h3>
    <div class="desc">${props.description}</div>
  </div>
`

export default () => {
  const images = [...new Array(19).keys()].map(i => ({
    title: `第 ${i} 张`,
    images: ['memes/[1][第 一 张 梗 图].png', 'memes/[1][第 一 张 梗 图].png'],
    description: `这是第 ${i} 张图`
  }))
  return html`
    <div class="gallery">
      <div class="col0">
        ${images.filter((_, i) => i % 3 === 0).map(p => Image(p))}
      </div>
      <div class="col1">
        ${images.filter((_, i) => i % 3 === 1).map(p => Image(p))}
      </div>
      <div class="col2">
        ${images.filter((_, i) => i % 3 === 2).map(p => Image(p))}
      </div>
    </div>
  `
}
