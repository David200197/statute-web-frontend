import { Entities } from '@/common/abstracts/entities.abstracts'
import { Admin } from './admin'
import type { AdminModel, AdminProps } from '../models/admin.model'
import type { AdminsModel } from '../models/admins.model'

export class Admins extends Entities<AdminModel> implements AdminsModel {
  private constructor(public readonly value: AdminModel[]) {
    super(value)
  }

  static create(value: AdminProps[]): Admins {
    if (!Array.isArray(value)) throw new TypeError('Admins is not a array')
    return new Admins(value.map((data) => Admin.create(data)))
  }
}
