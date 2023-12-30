import { Entity } from '@/common/abstracts/entity.abstract'
import type { InvitationModel, InvitationProps } from '../models/invitation.model'
import type { PropsToValueObjects } from '@/common/interfaces/props-to-value-objects'
import { Uuid } from '@/common/value-object/uuid.value-object'

export class Invitation extends Entity<InvitationProps> implements InvitationModel {
  private constructor(options: PropsToValueObjects<InvitationProps>) {
    super(options)
  }

  public static create(options: InvitationProps): Invitation {
    const uuid = Uuid.create(options.uuid)
    return new Invitation({ uuid })
  }
}
