export class LastName {
  private constructor(public readonly value: string) {}

  public static checkIsLastName(value: string): void {
    if (typeof value !== 'string') throw new TypeError('lastName is not string')
  }

  public static create(value: string): LastName {
    this.checkIsLastName(value)
    return new LastName(value)
  }
}
