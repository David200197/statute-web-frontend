import { SpecialtyDegreeEnum } from '../../models/about-us.model';

export class SpecialtyDegree {
  private constructor(public readonly value: SpecialtyDegreeEnum) {}

  public static checkIsSpecialtyDegree(value: SpecialtyDegreeEnum): void {
    if (
      value !== SpecialtyDegreeEnum.firstDegree &&
      value !== SpecialtyDegreeEnum.secondDegree
    )
      throw new TypeError('specialtyDegree is not string');
  }

  public static create(value: SpecialtyDegreeEnum): SpecialtyDegree {
    this.checkIsSpecialtyDegree(value);
    return new SpecialtyDegree(value);
  }
}
