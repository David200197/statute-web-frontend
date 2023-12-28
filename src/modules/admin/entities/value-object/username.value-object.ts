export class Username {
  private constructor(public readonly value: string) {}

  public static checkIsUsername(value: string): void {
    if (typeof value !== 'string') throw new TypeError('username is not string')
  }

  public static create(value: string): Username {
    this.checkIsUsername(value)
    return new Username(value)
  }
}
