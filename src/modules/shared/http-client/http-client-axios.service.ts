import { Either } from '@/common/lib/either.lib'
import type { HttpClientServiceModel, Options } from './http-client-service.model'
import axios from 'axios'
import { Exception } from '@/common/abstracts/extension.abstract'
import { injectable } from 'inversify'
import type { SerializerResponse } from '@/common/lib/response.lib'
import { Maybe } from '@/common/lib/maybe.lib'

@injectable()
export class HttpClientAxiosService implements HttpClientServiceModel {
  async get<Return>(
    url: string,
    { token }: Options = {}
  ): Promise<Either<Exception, Maybe<Return>>> {
    const {
      data: { data },
      status
    } = await axios.get<SerializerResponse<Return>>(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (status >= 400) {
      console.log(data)
      return Either.left(new Exception({ status: 400, message: 'http error' }))
    }
    return Either.right(Maybe.fromValue<Return>(data))
  }

  async post<Body, Return>(
    url: string,
    body: Body,
    { token }: Options = {}
  ): Promise<Either<Exception, Maybe<Return>>> {
    const {
      data: { data },
      status
    } = await axios.post<SerializerResponse<Return>>(url, body, {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (status >= 400) {
      console.log(data)
      return Either.left(new Exception({ status: 400, message: 'http error' }))
    }
    return Either.right(Maybe.fromValue<Return>(data))
  }

  async delete<Return>(
    url: string,
    { token }: Options = {}
  ): Promise<Either<Exception, Maybe<Return>>> {
    const {
      data: { data },
      status
    } = await axios.delete<SerializerResponse<Return>>(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (status >= 400) {
      console.log(data)
      return Either.left(new Exception({ status: 400, message: 'http error' }))
    }
    return Either.right(Maybe.fromValue(data))
  }

  async patch<Body, Return>(
    url: string,
    body: Body,
    { token }: Options = {}
  ): Promise<Either<Exception, Maybe<Return>>> {
    const {
      data: { data },
      status
    } = await axios.patch<SerializerResponse<Return>>(url, body, {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (status >= 400) {
      console.log(data)
      return Either.left(new Exception({ status: 400, message: 'http error' }))
    }
    return Either.right(Maybe.fromValue(data))
  }

  async put<Body, Return>(
    url: string,
    body: Body,
    { token }: Options = {}
  ): Promise<Either<Exception, Maybe<Return>>> {
    const {
      data: { data },
      status
    } = await axios.put<SerializerResponse<Return>>(url, body, {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (status >= 400) {
      console.log(data)
      return Either.left(new Exception({ status: 400, message: 'http error' }))
    }
    return Either.right(Maybe.fromValue(data))
  }
}
