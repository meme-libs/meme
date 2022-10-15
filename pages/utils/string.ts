export interface ResolverOptions {
  excludes?: (string | RegExp)[]
}

type Resolver = (o: any, options?: ResolverOptions) => any;

type StringResolve = (string: string) => string

export const createResolver = (resolve: StringResolve): Resolver => function resolver(o, options): any {
  if (o === null) return o

  if (Array.isArray(o)) {
    return o.map(item => typeof item === 'object'
      ? resolver(item, options)
      : item)
  }

  if (typeof o === 'object') {
    return Object.entries(o).reduce((acc, [key, value]) => {
      let needResolve = true
      if (options?.excludes) {
        needResolve = !options.excludes.some(exclude => {
          if (typeof exclude === 'string') {
            return exclude === key
          }
          return exclude.test(key)
        })
      }
      const nk = needResolve ? resolve(key) : key
      acc[nk] = resolver(value, options)
      return acc
    }, {} as Record<string, any>)
  } else {
    return o
  }
}

export function camelCase(s: string) {
  return s
    .replace(/['\u2019]/g, '')
    .replace(/([-_ ][!-_ ])/ig, ($1) => {
      return $1.toUpperCase()
        .replace(' ', '')
        .replace('-', '')
        .replace('_', '')
    })
}

export function snakeCase(s: string) {
  return s
    .replace(/['\u2019]/g, '')
    .replace(/\s+/g, '_')
    .replace(/([a-z\d])([A-Z])/g, '$1_$2')
    .replace(/[-\s]+/g, '_')
    .toLowerCase()
}

export const camelCaseObjKeys = createResolver(camelCase)
export const snakeCaseObjKeys = createResolver(snakeCase)
