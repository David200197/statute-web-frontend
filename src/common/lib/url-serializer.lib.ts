export class UrlSerializer {
  private queries: Map<string, string>
  private params: string[]
  constructor(private readonly path: string) {
    this.queries = new Map()
    this.params = []
  }
  setQuery(key: string, value: string) {
    this.queries.set(key, value)
  }
  setParam(value: string) {
    this.params.push(value)
  }
  serializer() {
    const entries = this.queries.entries()
    const url = `${this.path}${this.params.length ? `/${this.params.join('/')}` : ''}`
    const queriesSerialized: string[] = []
    for (const [key, value] of entries) {
      queriesSerialized.push(`${key}=${value}`)
    }
    return `${url}${queriesSerialized.length ? `?${queriesSerialized.join('&')}` : ''}`
  }
}
