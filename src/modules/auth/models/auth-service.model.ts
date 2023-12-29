import type { Exception } from '@/common/abstracts/extension.abstract'
import type { LoginAuthResponseDto } from '../dto/login-auth-response.dto'
import type { Either } from '@/common/lib/either.lib'
import type { LoginAuthDto } from '../dto/login-auth.dto'
import type { RefreshAuthResponseDto } from '../dto/refresh-auth-response.dto'
import type { AdminModel } from '@/modules/admin/models/admin.model'

export interface AuthServiceModel {
  login(loginAuthDto: LoginAuthDto): Promise<Either<Exception, LoginAuthResponseDto>>
  logout(): Promise<Either<Exception, void>>
  refresh(): Promise<Either<Exception, RefreshAuthResponseDto>>
  profile(): Promise<Either<Exception, AdminModel>>
}
