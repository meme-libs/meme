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
}

export default function html(strings: TemplateStringsArray, ...values: any[]) {
  return new HTMLEle(strings, values)
}

html.render = function (ele: HTMLElement, children: HTMLEle[]) {
  ele.innerHTML = children.map((child) => child.toString()).join('')
}
