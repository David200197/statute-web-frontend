import { Either } from '@/common/lib/either.lib'
import type { HttpClientServiceModel, Options } from './http-client-service.model'
import axios, { AxiosError } from 'axios'
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
    const response = await axios
      .post<SerializerResponse<Return>>(url, body, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => response.data)
      .catch(
        (error: AxiosError<{ message: string; statusCode: number }>) =>
          new Exception({
            message: error.response!.data.message,
            status: error.response!.data.statusCode
          })
      )
    if (response instanceof Exception) {
      return Either.left(new Exception(response))
    }
    return Either.right(Maybe.fromValue<Return>(response.data))
  }

  async delete<Return>(
    url: string,
    { token }: Options = {}
  ): Promise<Either<Exception, Maybe<Return>>> {
    const response = await axios
      .delete<SerializerResponse<Return>>(url, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => response.data)
      .catch(
        (error: AxiosError<{ message: string; statusCode: number }>) =>
          new Exception({
            message: error.response!.data.message,
            status: error.response!.data.statusCode
          })
      )
    if (response instanceof Exception) {
      return Either.left(new Exception(response))
    }
    return Either.right(Maybe.fromValue<Return>(response.data))
  }

  async patch<Body, Return>(
    url: string,
    body: Body,
    { token }: Options = {}
  ): Promise<Either<Exception, Maybe<Return>>> {
    const response = await axios
      .patch<SerializerResponse<Return>>(url, body, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => response.data)
      .catch(
        (error: AxiosError<{ message: string; statusCode: number }>) =>
          new Exception({
            message: error.response!.data.message,
            status: error.response!.data.statusCode
          })
      )
    if (response instanceof Exception) {
      return Either.left(new Exception(response))
    }
    return Either.right(Maybe.fromValue<Return>(response.data))
  }

  async put<Body, Return>(
    url: string,
    body: Body,
    { token }: Options = {}
  ): Promise<Either<Exception, Maybe<Return>>> {
    const response = await axios
      .put<SerializerResponse<Return>>(url, body, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => response.data)
      .catch(
        (error: AxiosError<{ message: string; statusCode: number }>) =>
          new Exception({
            message: error.response!.data.message,
            status: error.response!.data.statusCode
          })
      )
    if (response instanceof Exception) {
      return Either.left(new Exception(response))
    }
    return Either.right(Maybe.fromValue<Return>(response.data))
  }
}
