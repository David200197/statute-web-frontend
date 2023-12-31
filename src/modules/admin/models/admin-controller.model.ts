import type { FindAllDto } from '@/common/dto/find-all.dto'
import type { AdminModel } from './admin.model'
import type { AdminsResponseDto } from '../dto/admins-response.dto'
import type { CreateAdminDto } from '../dto/create-admin.dto'
import type { UpdateAdminDto } from '../dto/update-admin.dto'

export interface AdminControllerModel {
  findOne(username: string): Promise<AdminModel>
  findAll(options?: FindAllDto): Promise<AdminsResponseDto>
  create(options: CreateAdminDto): Promise<AdminModel>
  update(username: string, options: UpdateAdminDto): Promise<AdminModel>
  delete(username: string): Promise<AdminModel>
}
