import type { TokenControlServiceModel, Tokens } from './token-control-service.model'

export class TokenControlService implements TokenControlServiceModel {
  setTokens({ accessToken, refreshToken }: Tokens): void {
    localStorage.setItem('ACCESS_TOKEN', accessToken)
    localStorage.setItem('REFRESH_TOKEN', refreshToken)
  }
  getTokens(): Tokens {
    const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
    const refreshToken = localStorage.getItem('REFRESH_TOKEN') || ''
    return { accessToken, refreshToken }
  }
  cleanTokens(): void {
    localStorage.getItem('')
    localStorage.getItem('')
  }
}
