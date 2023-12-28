import { Exception } from '@/common/abstracts/extension.abstract'
import { Either } from '@/common/lib/either.lib'
import type { LoginAuthResponseDto } from './dto/login-auth-response.dto'
import type { LoginAuthDto } from './dto/login-auth.dto'
import type { LogoutAuthDto } from './dto/logout-auth.dto'
import type { RefreshAuthResponseDto } from './dto/refresh-auth-response.dto'
import type { RefreshAuthDto } from './dto/refresh-auth.dto'
import type { AuthServiceModel } from './models/auth-service.model'
import { inject, injectable } from 'inversify'
import environment from '@/configs/environment'
import { TOKEN_CONTROL_TOKEN } from '../shared/token-control/token-control.di'
import { HTTP_CLIENT_TOKEN } from '../shared/http-client/http-client.di'
import type { HttpClientServiceModel } from '../shared/http-client/http-client-service.model'
import type { TokenControlServiceModel } from '../shared/token-control/token-control-service.model'
import type { AdminModel, AdminProps } from '../admin/models/admin.model'
import { Admin } from '../admin/entities/admin'

@injectable()
export class AuthService implements AuthServiceModel {
  private API: string

  constructor(
    @inject(HTTP_CLIENT_TOKEN) private readonly httpClientService: HttpClientServiceModel,
    @inject(TOKEN_CONTROL_TOKEN) private readonly tokenControlService: TokenControlServiceModel
  ) {
    this.API = `${environment().api}/api/auth`
  }

  async login(loginAuthDto: LoginAuthDto): Promise<Either<Exception, LoginAuthResponseDto>> {
    const either = await this.httpClientService.post<LoginAuthDto, LoginAuthResponseDto>(
      `${this.API}/login`,
      loginAuthDto
    )
    return either.flatMap<LoginAuthResponseDto>((data) => {
      if (data.isEmpty())
        return Either.left(new Exception({ message: 'empty logout data', status: 400 }))
      const tokens = data.get()
      this.tokenControlService.setTokens({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      })
      return Either.right(tokens)
    })
  }

  async logout(logoutAuthDto: LogoutAuthDto): Promise<Either<Exception, void>> {
    const either = await this.httpClientService.post<LogoutAuthDto, void>(
      `${this.API}/logout`,
      logoutAuthDto
    )
    return either.map(() => {
      this.tokenControlService.cleanTokens()
    })
  }

  async refresh(
    refreshAuthDto: RefreshAuthDto
  ): Promise<Either<Exception, RefreshAuthResponseDto>> {
    const { refreshToken } = this.tokenControlService.getTokens()
    const either = await this.httpClientService.post<RefreshAuthDto, RefreshAuthResponseDto>(
      `${this.API}/refresh`,
      refreshAuthDto,
      { token: refreshToken }
    )
    return either.flatMap<RefreshAuthResponseDto>((data) => {
      if (data.isEmpty())
        return Either.left(new Exception({ message: 'empty refresh data', status: 400 }))
      const tokens = data.get()
      this.tokenControlService.setTokens({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      })
      return Either.right(tokens)
    })
  }

  async profile(): Promise<Either<Exception, AdminModel>> {
    const { accessToken } = this.tokenControlService.getTokens()
    const admin = await this.httpClientService.get<AdminProps>(`${this.API}/profile`, {
      token: accessToken
    })
    return admin.flatMap<AdminModel>((data) => {
      if (data.isEmpty())
        return Either.left(new Exception({ message: 'empty admin data', status: 400 }))
      return Either.right(Admin.create(data.get()))
    })
  }
}
