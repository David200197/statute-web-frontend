import { Either } from '@/common/lib/either.lib'
import type { HttpClientServiceModel, Options } from './http-client-service.model'
import axios from 'axios'
import { Exception } from '@/common/abstracts/extension.abstract'
import { injectable } from 'inversify'

@injectable()
export class HttpClientAxiosService implements HttpClientServiceModel {
  async get<Return>(url: string, { token }: Options = {}): Promise<Either<Exception, Return>> {
    const { data, status } = await axios.get<Return>(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (status >= 400) {
      console.log(data)
      return Either.left(new Exception({ status: 400, message: 'http error' }))
    }
    return Either.right(data)
  }

  async post<Body, Return>(
    url: string,
    body: Body,
    { token }: Options = {}
  ): Promise<Either<Exception, Return>> {
    const { data, status } = await axios.post<Return>(url, body, {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (status >= 400) {
      console.log(data)
      return Either.left(new Exception({ status: 400, message: 'http error' }))
    }
    return Either.right(data)
  }

  async delete<Return>(url: string, { token }: Options = {}): Promise<Either<Exception, Return>> {
    const { data, status } = await axios.delete<Return>(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (status >= 400) {
      console.log(data)
      return Either.left(new Exception({ status: 400, message: 'http error' }))
    }
    return Either.right(data)
  }

  async patch<Body, Return>(
    url: string,
    body: Body,
    { token }: Options = {}
  ): Promise<Either<Exception, Return>> {
    const { data, status } = await axios.patch<Return>(url, body, {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (status >= 400) {
      console.log(data)
      return Either.left(new Exception({ status: 400, message: 'http error' }))
    }
    return Either.right(data)
  }

  async put<Body, Return>(
    url: string,
    body: Body,
    { token }: Options = {}
  ): Promise<Either<Exception, Return>> {
    const { data, status } = await axios.put<Return>(url, body, {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (status >= 400) {
      console.log(data)
      return Either.left(new Exception({ status: 400, message: 'http error' }))
    }
    return Either.right(data)
  }
}
