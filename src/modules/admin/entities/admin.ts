import { Username } from './value-object/username.value-object'
import { RefreshToken } from './value-object/refresh-token.value-object'
import { Entity } from '@/common/abstracts/entity.abstract'
import type { AdminModel, AdminProps } from '../models/admin.model'
import type { PropsToValueObjects } from '@/common/interfaces/props-to-value-objects'
import type { SelfPartial } from '@/common/interfaces/self-partial'
import { Uuid } from '@/common/value-object/uuid.value-object'

export class Admin extends Entity<AdminProps> implements AdminModel {
  private constructor(options: PropsToValueObjects<AdminProps>) {
    super(options)
  }

  public static create(options: SelfPartial<AdminProps, 'uuid'>): Admin {
    const uuid = Uuid.create(options.uuid)
    const username = Username.create(options.username)
    const refreshToken = RefreshToken.create(options.refreshToken)
    return new Admin({ uuid, username, refreshToken })
  }
}
