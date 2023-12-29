import { Entities } from '@/common/abstracts/entities.abstracts'
import type { AnniversaryModel, AnniversaryProps } from '../models/anniversary.model'
import type { AnniversariesModel } from '../models/anniversaries.model'
import { Anniversary } from './anniversary'

export class Anniversaries extends Entities<AnniversaryModel> implements AnniversariesModel {
  private constructor(public readonly value: AnniversaryModel[]) {
    super(value)
  }

  static create(value: AnniversaryProps[]) {
    if (!Array.isArray(value)) throw new TypeError('Anniversaries is not a array')
    return new Anniversaries(value.map((data) => Anniversary.create(data)))
  }
}
