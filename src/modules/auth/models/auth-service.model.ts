import type { Exception } from '@/common/abstracts/extension.abstract'
import type { LoginAuthResponseDto } from '../dto/login-auth-response.dto'
import type { Either } from '@/common/lib/either.lib'
import type { LoginAuthDto } from '../dto/login-auth.dto'
import type { LogoutAuthDto } from '../dto/logout-auth.dto'
import type { RefreshAuthResponseDto } from '../dto/refresh-auth-response.dto'
import type { RefreshAuthDto } from '../dto/refresh-auth.dto'
import type { AdminModel } from '@/modules/admin/models/admin.model'

export interface AuthServiceModel {
  login(loginAuthDto: LoginAuthDto): Promise<Either<Exception, LoginAuthResponseDto>>
  logout(logoutAuthDto: LogoutAuthDto): Promise<Either<Exception, void>>
  refresh(refreshAuthDto: RefreshAuthDto): Promise<Either<Exception, RefreshAuthResponseDto>>
  profile(): Promise<Either<Exception, AdminModel>>
}
