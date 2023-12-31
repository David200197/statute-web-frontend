import type { Exception } from '@/common/abstracts/extension.abstract'
import type { FindAllDto } from '@/common/dto/find-all.dto'
import type { Either } from '@/common/lib/either.lib'
import type { CreateAdminDto } from './dto/create-admin.dto'
import type { UpdateAdminDto } from './dto/update-admin.dto'
import type { AdminServiceModel } from './models/admin-service.model'
import type { AdminModel, AdminProps } from './models/admin.model'
import { inject, injectable } from 'inversify'
import type { AdminsResponseDto } from './dto/admins-response.dto'
import { API_TOKEN } from '../api/api.di'
import type { ApiServiceModel } from '../api/api-service.model'
import { Admin } from './entities/admin'
import type { AdminsPropsResponseDto } from './dto/admins-props-response.dto'
import { Admins } from './entities/admins'

@injectable()
export class AdminService implements AdminServiceModel {
  constructor(@inject(API_TOKEN) private readonly apiService: ApiServiceModel) {}

  async findOne(username: string): Promise<Either<Exception, AdminModel>> {
    const admin = await this.apiService.get<AdminProps>('admin', {
      params: [username]
    })
    return admin.map((data) => Admin.create(data))
  }

  async findAll({ order, orderBy, page, perPage }: FindAllDto = {}): Promise<
    Either<Exception, AdminsResponseDto>
  > {
    const queries: Record<string, string> = {}
    if (order) queries['order'] = order
    if (orderBy) queries['orderBy'] = orderBy
    if (page) queries['page'] = page
    if (perPage) queries['perPage'] = perPage

    const foundedResponse = await this.apiService.get<{
      data: AdminsPropsResponseDto
    }>('admin', { queries })

    return foundedResponse.map<AdminsResponseDto>(({ data }) => ({
      admins: Admins.create(data.admins),
      totalElement: data.totalElement,
      totalPage: data.totalPage
    }))
  }

  async create(options: CreateAdminDto): Promise<Either<Exception, AdminModel>> {
    const admin = await this.apiService.post<CreateAdminDto, AdminProps>('admin', options)
    return admin.map((data) => Admin.create(data))
  }

  async updateOne(
    username: string,
    options: UpdateAdminDto
  ): Promise<Either<Exception, AdminModel>> {
    const admin = await this.apiService.patch<UpdateAdminDto, AdminProps>('admin', options, {
      params: [username]
    })
    return admin.map((data) => Admin.create(data))
  }

  async removeOne(username: string): Promise<Either<Exception, AdminModel>> {
    const admin = await this.apiService.delete<AdminProps>('admin', {
      params: [username]
    })
    return admin.map((data) => Admin.create(data))
  }
}
