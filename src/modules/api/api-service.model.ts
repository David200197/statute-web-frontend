import type { Either } from '@/common/lib/either.lib'
import type { Exception } from '@/common/abstracts/extension.abstract'

export type Endpoint =
  | 'about-us'
  | 'admin'
  | 'anniversary'
  | 'event'
  | 'invitation'
  | 'social-network'
  | 'statute'

export type Options = {
  params?: string[]
  queries?: Record<string, string>
}

export interface ApiServiceModel {
  get<Return>(endpoint: Endpoint, options?: Options): Promise<Either<Exception, Return>>
  post<Body, Return>(
    endpoint: Endpoint,
    body?: Body,
    options?: Options
  ): Promise<Either<Exception, Return>>
  delete<Return>(endpoint: Endpoint, options?: Options): Promise<Either<Exception, Return>>
  patch<Body, Return>(
    endpoint: Endpoint,
    body?: Body,
    options?: Options
  ): Promise<Either<Exception, Return>>
  put<Body, Return>(
    endpoint: Endpoint,
    body?: Body,
    options?: Options
  ): Promise<Either<Exception, Return>>
}
