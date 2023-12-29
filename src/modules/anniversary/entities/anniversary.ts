import { Entity } from '@/common/abstracts/entity.abstract'
import type { AnniversaryModel, AnniversaryProps } from '../models/anniversary.model'
import type { PropsToValueObjects } from '@/common/interfaces/props-to-value-objects'
import { Uuid } from '@/common/value-object/uuid.value-object'

export class Anniversary extends Entity<AnniversaryProps> implements AnniversaryModel {
  private constructor(options: PropsToValueObjects<AnniversaryProps>) {
    super(options)
  }

  public static create(options: AnniversaryProps): Anniversary {
    const uuid = Uuid.create(options.uuid)
    return new Anniversary({ uuid })
  }
}
