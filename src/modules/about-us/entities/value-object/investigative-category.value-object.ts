import { InvestigativeCategoryEnum } from '../../models/about-us.model';

export class InvestigativeCategory {
  private constructor(public readonly value: InvestigativeCategoryEnum) {}

  public static checkIsInvestigativeCategory(value: string): void {
    if (
      value !== InvestigativeCategoryEnum.attache &&
      value !== InvestigativeCategoryEnum.auxiliary &&
      value !== InvestigativeCategoryEnum.headline
    )
      throw new TypeError('investigativeCategory is not string');
  }

  public static create(
    value: InvestigativeCategoryEnum,
  ): InvestigativeCategory {
    this.checkIsInvestigativeCategory(value);
    return new InvestigativeCategory(value);
  }
}
