import html from '../utils/html'

const Image = (props: {
  images: string[]
  description?: string
}) => html`
  <div class="image">
    ${props.images.map(src => html`
      <img
        src="${src}"
        alt="这是一张图"
        class="image__img"
      />
    `)}
    <div class="desc">${props.description}</div>
  </div>
`

export default () => html`
  <div class="gallery">
    ${[...new Array(10).keys()].map(i => Image({
      images: ['memes/[1][第 一 张 梗 图].png'],
      description: `这是第 ${i} 张图`
    }))}
  </div>
`
