import { containerDI } from '@/modules/di'
import type { HttpClientServiceModel } from './http-client-service.model'
import { HttpClientAxiosService } from './http-client-axios.service'

export const HTTP_CLIENT_TOKEN = Symbol('HTTP_CLIENT_TOKEN')
containerDI.bind<HttpClientServiceModel>(HTTP_CLIENT_TOKEN).to(HttpClientAxiosService)
