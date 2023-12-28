import type { Exception } from '@/common/abstracts/extension.abstract'
import type { FindAllDto } from '@/common/dto/find-all.dto'
import type { ResponseWithPaginate } from '@/common/interfaces/response-with-paginate'
import type { Either } from '@/common/lib/either.lib'
import type { CreateAdminDto } from './dto/create-admin.dto'
import type { UpdateAdminDto } from './dto/update-admin.dto'
import type { AdminServiceModel } from './models/admin-service.model'
import type { AdminModel } from './models/admin.model'
import type { AdminsModel } from './models/admins.model'
import { inject, injectable } from 'inversify'
import type { HttpClientServiceModel } from '../shared/http-client/http-client-service.model'
import { HTTP_CLIENT_TOKEN } from '../shared/http-client/http-client.di'
import type { TokenControlServiceModel } from '../shared/token-control/token-control-service.model'
import { TOKEN_CONTROL_TOKEN } from '../shared/token-control/token-control.di'
import environment from '@/configs/environment'

@injectable()
export class AdminService implements AdminServiceModel {
  private API: string

  constructor(
    @inject(HTTP_CLIENT_TOKEN) private readonly httpClientService: HttpClientServiceModel,
    @inject(TOKEN_CONTROL_TOKEN) private readonly tokenControlService: TokenControlServiceModel
  ) {
    this.API = `${environment().api}/api/admin`
  }

  findOne(username: string): Promise<Either<Exception, AdminModel>> {
    throw new Error('Method not implemented.')
  }
  findAll(options: FindAllDto): Promise<ResponseWithPaginate<AdminsModel>> {
    throw new Error('Method not implemented.')
  }
  create(options: CreateAdminDto): Promise<Either<Exception, AdminModel>> {
    throw new Error('Method not implemented.')
  }
  updateOne(username: string, options: UpdateAdminDto): Promise<Either<Exception, AdminModel>> {
    throw new Error('Method not implemented.')
  }
  removeOne(username: string): Promise<Either<Exception, AdminModel>> {
    throw new Error('Method not implemented.')
  }
  updateMany(username: string, options: UpdateAdminDto): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  removeMany(username: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
