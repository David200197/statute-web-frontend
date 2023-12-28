export class RefreshToken {
  private constructor(public readonly value: string = '') {}

  public static checkIsRefreshToken(value?: string): void {
    if (value && typeof value !== 'string') throw new TypeError('refresh token is not string')
  }

  public static create(value?: string): RefreshToken {
    this.checkIsRefreshToken(value)
    return new RefreshToken(value)
  }
}
