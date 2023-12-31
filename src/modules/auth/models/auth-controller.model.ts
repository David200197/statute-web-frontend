import type { LoginAuthResponseDto } from '../dto/login-auth-response.dto'
import type { LoginAuthDto } from '../dto/login-auth.dto'
import type { RefreshAuthResponseDto } from '../dto/refresh-auth-response.dto'
import type { AdminModel } from '@/modules/admin/models/admin.model'

export interface AuthControllerModel {
  login(loginAuthDto: LoginAuthDto): Promise<LoginAuthResponseDto>
  logout(): Promise<void>
  refresh(): Promise<RefreshAuthResponseDto>
  profile(): Promise<AdminModel>
}
