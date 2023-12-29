export type Options = {
  queries?: Record<string, string>
  params?: string[]
}

export class UrlSerializer {
  constructor(
    private readonly path: string,
    private readonly options: Options = {}
  ) {}
  serializer() {
    const { params = [], queries = {} } = this.options
    const url = `${this.path}${params.length ? `/${params.join('/')}` : ''}`
    const queriesSerialized: string[] = []
    const keys = Object.keys(queries)
    for (const key of keys) {
      queriesSerialized.push(`${key}=${queries[key]}`)
    }
    return `${url}${queriesSerialized.length ? `?${queriesSerialized.join('&')}` : ''}`
  }
}
