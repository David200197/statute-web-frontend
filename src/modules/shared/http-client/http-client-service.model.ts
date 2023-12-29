import type { Exception } from '@/common/abstracts/extension.abstract'
import type { Either } from '@/common/lib/either.lib'

export type Options = {
  token?: string
}

export interface HttpClientServiceModel {
  get<Return>(url: string, options?: Options): Promise<Either<Exception, Return>>
  post<Body, Return>(
    url: string,
    body?: Body,
    options?: Options
  ): Promise<Either<Exception, Return>>
  delete<Return>(url: string, options?: Options): Promise<Either<Exception, Return>>
  patch<Body, Return>(
    url: string,
    body?: Body,
    options?: Options
  ): Promise<Either<Exception, Return>>
  put<Body, Return>(url: string, body?: Body, options?: Options): Promise<Either<Exception, Return>>
}
