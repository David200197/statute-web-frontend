import { Either } from '@/common/lib/either.lib'
import type { HttpClientServiceModel, Options } from './http-client-service.model'
import axios, { AxiosError } from 'axios'
import { Exception } from '@/common/abstracts/extension.abstract'
import { injectable } from 'inversify'
@injectable()
export class HttpClientAxiosService implements HttpClientServiceModel {
  private handleError = (error: AxiosError<{ message: string; statusCode: number }>) => {
    if (error.response)
      return new Exception({
        message: error.response.data.message,
        status: error.response.data.statusCode
      })
    if (error.request)
      return new Exception({
        message: 'ErrorRequest',
        status: 400
      })
    return new Exception({
      message: error.message,
      status: error.status || 400
    })
  }

  async get<Return>(url: string, { token }: Options = {}): Promise<Either<Exception, Return>> {
    const response = await axios
      .get<Return>(url, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .catch(this.handleError)
    if (response instanceof Exception) {
      return Either.left(new Exception(response))
    }
    return Either.right(response.data)
  }

  async post<Body, Return>(
    url: string,
    body: Body,
    { token }: Options = {}
  ): Promise<Either<Exception, Return>> {
    const response = await axios
      .post<Return>(url, body, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .catch(this.handleError)
    if (response instanceof Exception) {
      return Either.left(new Exception(response))
    }
    return Either.right(response.data)
  }

  async delete<Return>(url: string, { token }: Options = {}): Promise<Either<Exception, Return>> {
    const response = await axios
      .delete<Return>(url, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .catch(this.handleError)
    if (response instanceof Exception) {
      return Either.left(new Exception(response))
    }
    return Either.right(response.data)
  }

  async patch<Body, Return>(
    url: string,
    body: Body,
    { token }: Options = {}
  ): Promise<Either<Exception, Return>> {
    const response = await axios
      .patch<Return>(url, body, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .catch(this.handleError)
    if (response instanceof Exception) {
      return Either.left(new Exception(response))
    }
    return Either.right(response.data)
  }

  async put<Body, Return>(
    url: string,
    body: Body,
    { token }: Options = {}
  ): Promise<Either<Exception, Return>> {
    const response = await axios
      .put<Return>(url, body, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .catch(this.handleError)
    if (response instanceof Exception) {
      return Either.left(new Exception(response))
    }
    return Either.right(response.data)
  }
}
