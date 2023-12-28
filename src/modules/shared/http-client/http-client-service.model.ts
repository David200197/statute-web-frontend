import type { Exception } from '@/common/abstracts/extension.abstract'
import type { Either } from '@/common/lib/either.lib'
import type { Maybe } from '@/common/lib/maybe.lib'

export type Options = {
  token?: string
}

export interface HttpClientServiceModel {
  get<Return>(url: string, options?: Options): Promise<Either<Exception, Maybe<Return>>>
  post<Body, Return>(
    url: string,
    body: Body,
    options?: Options
  ): Promise<Either<Exception, Maybe<Return>>>
  delete<Return>(url: string, options?: Options): Promise<Either<Exception, Maybe<Return>>>
  patch<Body, Return>(
    url: string,
    body: Body,
    options?: Options
  ): Promise<Either<Exception, Maybe<Return>>>
  put<Body, Return>(
    url: string,
    body: Body,
    options?: Options
  ): Promise<Either<Exception, Maybe<Return>>>
}
