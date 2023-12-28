export class SerializerResponse<T> {
  constructor(
    readonly response: string,
    readonly data?: T,
    readonly ok = true
  ) {}
}
