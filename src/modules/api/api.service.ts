import { inject, injectable } from 'inversify'
import type { ApiServiceModel, Endpoint, Options } from './api-service.model'
import { Exception } from '@/common/abstracts/extension.abstract'
import { Either } from '@/common/lib/either.lib'
import { HTTP_CLIENT_TOKEN } from '../shared/http-client/http-client.di'
import { TOKEN_CONTROL_SERVICE_TOKEN } from '../shared/token-control/token-control.di'
import environment from '@/configs/environment'
import type { HttpClientServiceModel } from '../shared/http-client/http-client-service.model'
import type { TokenControlServiceModel } from '../shared/token-control/token-control-service.model'
import { AUTH_TOKEN } from '../auth/auth.di'
import type { AuthServiceModel } from '../auth/models/auth-service.model'
import { UrlSerializer } from '@/common/lib/url-serializer.lib'

@injectable()
export class ApiService implements ApiServiceModel {
  private API: string

  constructor(
    @inject(HTTP_CLIENT_TOKEN) private readonly httpClientService: HttpClientServiceModel,
    @inject(TOKEN_CONTROL_SERVICE_TOKEN) private readonly tokenControlService: TokenControlServiceModel,
    @inject(AUTH_TOKEN) private readonly authService: AuthServiceModel
  ) {
    this.API = `${environment().api}/api`
  }

  private getUrl(endpoint: Endpoint, { params = [], queries = {} }: Options = {}) {
    const url = new UrlSerializer(`${this.API}/${endpoint}`, {
      params,
      queries
    })
    return url.serializer()
  }

  async get<Return>(endpoint: Endpoint, options?: Options): Promise<Either<Exception, Return>> {
    const url = this.getUrl(endpoint, options)
    const firstTokens = this.tokenControlService.getTokens()
    const response = await this.httpClientService.get<Return>(url, {
      token: firstTokens.accessToken
    })
    if (response.isRight()) return response

    const error = response.getLeftOrElse(new Exception({ message: 'Error', status: 400 }))
    if (error.status !== 401 && error.message === 'Unauthorized') return Either.left(error)
    await this.authService.refresh()
    const secondTokens = this.tokenControlService.getTokens()
    return await this.httpClientService.get<Return>(`${this.API}/profile`, {
      token: secondTokens.accessToken
    })
  }

  async post<Body, Return>(
    endpoint: Endpoint,
    body?: Body | undefined,
    options?: Options | undefined
  ): Promise<Either<Exception, Return>> {
    const url = this.getUrl(endpoint, options)
    const firstTokens = this.tokenControlService.getTokens()
    const response = await this.httpClientService.post<Body, Return>(url, body, {
      token: firstTokens.accessToken
    })
    if (response.isRight()) return response

    const error = response.getLeftOrElse(new Exception({ message: 'Error', status: 400 }))
    if (error.status !== 401 && error.message === 'Unauthorized') return Either.left(error)
    await this.authService.refresh()
    const secondTokens = this.tokenControlService.getTokens()
    return await this.httpClientService.post<Body, Return>(`${this.API}/profile`, body, {
      token: secondTokens.accessToken
    })
  }

  async delete<Return>(
    endpoint: Endpoint,
    options?: Options | undefined
  ): Promise<Either<Exception, Return>> {
    const url = this.getUrl(endpoint, options)
    const firstTokens = this.tokenControlService.getTokens()
    const response = await this.httpClientService.delete<Return>(url, {
      token: firstTokens.accessToken
    })
    if (response.isRight()) return response

    const error = response.getLeftOrElse(new Exception({ message: 'Error', status: 400 }))
    if (error.status !== 401 && error.message === 'Unauthorized') return Either.left(error)
    await this.authService.refresh()
    const secondTokens = this.tokenControlService.getTokens()
    return await this.httpClientService.delete<Return>(`${this.API}/profile`, {
      token: secondTokens.accessToken
    })
  }

  async patch<Body, Return>(
    endpoint: Endpoint,
    body?: Body | undefined,
    options?: Options | undefined
  ): Promise<Either<Exception, Return>> {
    const url = this.getUrl(endpoint, options)
    const firstTokens = this.tokenControlService.getTokens()
    const response = await this.httpClientService.patch<Body, Return>(url, body, {
      token: firstTokens.accessToken
    })
    if (response.isRight()) return response

    const error = response.getLeftOrElse(new Exception({ message: 'Error', status: 400 }))
    if (error.status !== 401 && error.message === 'Unauthorized') return Either.left(error)
    await this.authService.refresh()
    const secondTokens = this.tokenControlService.getTokens()
    return await this.httpClientService.patch<Body, Return>(`${this.API}/profile`, body, {
      token: secondTokens.accessToken
    })
  }

  async put<Body, Return>(
    endpoint: Endpoint,
    body?: Body | undefined,
    options?: Options | undefined
  ): Promise<Either<Exception, Return>> {
    const url = this.getUrl(endpoint, options)
    const firstTokens = this.tokenControlService.getTokens()
    const response = await this.httpClientService.put<Body, Return>(url, body, {
      token: firstTokens.accessToken
    })
    if (response.isRight()) return response

    const error = response.getLeftOrElse(new Exception({ message: 'Error', status: 400 }))
    if (error.status !== 401 && error.message === 'Unauthorized') return Either.left(error)
    await this.authService.refresh()
    const secondTokens = this.tokenControlService.getTokens()
    return await this.httpClientService.put<Body, Return>(`${this.API}/profile`, body, {
      token: secondTokens.accessToken
    })
  }
}
