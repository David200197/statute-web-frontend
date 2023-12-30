export class Sponsors {
  constructor(public readonly value: string) {}

  public static checkIsSponsors(value: string): void {
    if (typeof value !== 'string') throw new TypeError('sponsors is not string')
  }

  public static create(value: string): Sponsors {
    this.checkIsSponsors(value)
    return new Sponsors(value)
  }
}
