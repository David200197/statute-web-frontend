import { Entity } from '@/common/abstracts/entity.abstract'
import type { StatuteModel, StatuteProps } from '../models/statute.model'
import type { PropsToValueObjects } from '@/common/interfaces/props-to-value-objects'
import { Uuid } from '@/common/value-object/uuid.value-object'

export class Statute extends Entity<StatuteProps> implements StatuteModel {
  private constructor(options: PropsToValueObjects<StatuteProps>) {
    super(options)
  }

  public static create(options: StatuteProps): Statute {
    const uuid = Uuid.create(options.uuid)
    return new Statute({ uuid })
  }
}
