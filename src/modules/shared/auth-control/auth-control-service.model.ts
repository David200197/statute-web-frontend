export type Tokens = {
  accessToken: string
  refreshToken: string
}

export interface AuthControlServiceModel {
  setTokens(tokens: Tokens): void
  getTokens(): Tokens
}
