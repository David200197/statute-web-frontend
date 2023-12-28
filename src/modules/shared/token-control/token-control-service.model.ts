export type Tokens = {
  accessToken: string
  refreshToken: string
}

export interface TokenControlServiceModel {
  setTokens(tokens: Tokens): void
  getTokens(): Tokens
  cleanTokens(): void
}
