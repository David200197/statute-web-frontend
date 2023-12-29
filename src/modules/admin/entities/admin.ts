import { Username } from './value-object/username.value-object'
import { Entity } from '@/common/abstracts/entity.abstract'
import type { AdminModel, AdminProps } from '../models/admin.model'
import type { PropsToValueObjects } from '@/common/interfaces/props-to-value-objects'
import { Uuid } from '@/common/value-object/uuid.value-object'

export class Admin extends Entity<AdminProps> implements AdminModel {
  private constructor(options: PropsToValueObjects<AdminProps>) {
    super(options)
  }

  public static create(options: AdminProps): Admin {
    const uuid = Uuid.create(options.uuid)
    const username = Username.create(options.username)
    return new Admin({ uuid, username })
  }
}
