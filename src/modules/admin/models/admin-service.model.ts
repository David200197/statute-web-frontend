import type { AdminModel } from './admin.model'
import type { FindAllDto } from '@/common/dto/find-all.dto'
import type { ResponseWithPaginate } from '@/common/interfaces/response-with-paginate'
import type { AdminsModel } from './admins.model'
import type { CreateAdminDto } from '../dto/create-admin.dto'
import type { UpdateAdminDto } from '../dto/update-admin.dto'
import type { Either } from '@/common/lib/either.lib'
import type { Exception } from '@/common/abstracts/extension.abstract'

export interface AdminServiceModel {
  findOne(username: string): Promise<Either<Exception, AdminModel>>
  findAll(options: FindAllDto): Promise<ResponseWithPaginate<AdminsModel>>
  create(options: CreateAdminDto): Promise<Either<Exception, AdminModel>>
  updateOne(username: string, options: UpdateAdminDto): Promise<Either<Exception, AdminModel>>
  removeOne(username: string): Promise<Either<Exception, AdminModel>>
  updateMany(username: string, options: UpdateAdminDto): Promise<boolean>
  removeMany(username: string): Promise<boolean>
}
