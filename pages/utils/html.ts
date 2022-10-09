function resolve(value: any): string {
  if (Array.isArray(value)) {
    return value.map(resolve).join('')
  } else {
    switch (typeof value) {
      case 'string':
        return value
      case 'undefined':
        return ''
      default:
        return String(value)
    }
  }
}

export class HTMLEle {
  self: Element | null = null
  readonly #inner: [strings: TemplateStringsArray, values: any[]]
  constructor(strings: TemplateStringsArray, values: any[]) {
    this.#inner = [strings, values]
  }
  toString() {
    const [strings, values] = this.#inner
    return strings.reduce((acc, str, i) => {
      return acc + str + String(resolve(values[i]) || '')
    }, '')
  }
  mount(self: Element) {
    this.self = self
    self.innerHTML = this.toString()
  }
}

export default function html(strings: TemplateStringsArray, ...values: any[]) {
  return new HTMLEle(strings, values)
}

const renderEle = document.createElement('div')

html.render = function (ele: HTMLElement, children: (() => HTMLEle)[]) {
  const elements = children.map(fc => {
    const fcIns = fc()
    renderEle.innerHTML = fcIns.toString()
    const ele = renderEle.firstElementChild!
    fcIns.mount(ele)
    return ele
  })
  ele.append(...elements)
}
