import { Entities } from '@/common/abstracts/entities.abstracts'
import type { StatuteModel, StatuteProps } from '../models/statute.model'
import type { StatutesModel } from '../models/statutes.model'
import { Statute } from './statute'

export class Statutes extends Entities<StatuteModel> implements StatutesModel {
  private constructor(public readonly value: StatuteModel[]) {
    super(value)
  }

  static create(value: StatuteProps[]) {
    if (!Array.isArray(value)) throw new TypeError('Statutes is not a array')
    return new Statutes(value.map((data) => Statute.create(data)))
  }
}
