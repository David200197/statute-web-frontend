type Options = { message: string; status: number }

export class Exception extends Error {
  public readonly status: number
  constructor(options: Options) {
    super(options.message)
    this.status = options.status
  }
}
