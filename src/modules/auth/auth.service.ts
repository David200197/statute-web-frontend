import { Exception } from '@/common/abstracts/extension.abstract'
import { Either } from '@/common/lib/either.lib'
import type { LoginAuthResponseDto } from './dto/login-auth-response.dto'
import type { LoginAuthDto } from './dto/login-auth.dto'
import type { RefreshAuthResponseDto } from './dto/refresh-auth-response.dto'
import type { AuthServiceModel } from './models/auth-service.model'
import { inject, injectable } from 'inversify'
import environment from '@/configs/environment'
import { TOKEN_CONTROL_TOKEN } from '../shared/token-control/token-control.di'
import { HTTP_CLIENT_TOKEN } from '../shared/http-client/http-client.di'
import type { HttpClientServiceModel } from '../shared/http-client/http-client-service.model'
import type { TokenControlServiceModel } from '../shared/token-control/token-control-service.model'
import type { AdminModel } from '../admin/models/admin.model'
import { Admin } from '../admin/entities/admin'
import type { ProfileAuthResponseDto } from './dto/profile-auth-response.dto'

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
    const either = await this.httpClientService.post<LoginAuthDto, { data: LoginAuthResponseDto }>(
      `${this.API}/login`,
      loginAuthDto
    )
    return either.flatMap<LoginAuthResponseDto>(({ data: tokens }) => {
      this.tokenControlService.setTokens({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      })
      return Either.right(tokens)
    })
  }

  async logout(): Promise<Either<Exception, void>> {
    const either = await this.httpClientService.post(`${this.API}/logout`)
    return either.map(() => {
      this.tokenControlService.cleanTokens()
    })
  }

  async refresh(): Promise<Either<Exception, RefreshAuthResponseDto>> {
    const { refreshToken } = this.tokenControlService.getTokens()
    const either = await this.httpClientService.get<{ data: RefreshAuthResponseDto }>(
      `${this.API}/refresh`,
      { token: refreshToken }
    )
    return either.flatMap<RefreshAuthResponseDto>(({ data: tokens }) => {
      this.tokenControlService.setTokens({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      })
      return Either.right(tokens)
    })
  }

  async profile(): Promise<Either<Exception, AdminModel>> {
    const firstTokens = this.tokenControlService.getTokens()
    let admin = await this.httpClientService.get<{ data: ProfileAuthResponseDto }>(
      `${this.API}/profile`,
      {
        token: firstTokens.accessToken
      }
    )
    if (admin.isRight()) {
      return admin.flatMap<AdminModel>(({ data }) => {
        return Either.right(Admin.create(data.admin))
      })
    }
    const error = admin.getLeftOrElse(new Exception({ message: 'Error', status: 400 }))
    if (error.status !== 401 && error.message === 'Unauthorized') return Either.left(error)
    await this.refresh()
    const secondTokens = this.tokenControlService.getTokens()
    admin = await this.httpClientService.get<{ data: ProfileAuthResponseDto }>(
      `${this.API}/profile`,
      {
        token: secondTokens.accessToken
      }
    )
    return admin.flatMap<AdminModel>(({ data }) => {
      return Either.right(Admin.create(data.admin))
    })
  }
}
