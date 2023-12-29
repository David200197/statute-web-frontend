import type { AdminModel } from './admin.model'
import type { FindAllDto } from '@/common/dto/find-all.dto'
import type { CreateAdminDto } from '../dto/create-admin.dto'
import type { UpdateAdminDto } from '../dto/update-admin.dto'
import type { Either } from '@/common/lib/either.lib'
import type { Exception } from '@/common/abstracts/extension.abstract'
import type { AdminsModelResponseDto } from '../dto/admins-model-response.dto'

export interface AdminServiceModel {
  findOne(username: string): Promise<Either<Exception, AdminModel>>
  findAll(options?: FindAllDto): Promise<Either<Exception, AdminsModelResponseDto>>
  create(options: CreateAdminDto): Promise<Either<Exception, AdminModel>>
  updateOne(username: string, options: UpdateAdminDto): Promise<Either<Exception, AdminModel>>
  removeOne(username: string): Promise<Either<Exception, AdminModel>>
}
