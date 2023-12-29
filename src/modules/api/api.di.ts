import { containerDI } from '../di'
import type { ApiServiceModel } from './api-service.model'
import { ApiService } from './api.service'

export const API_TOKEN = Symbol('API_TOKEN')
containerDI.bind<ApiServiceModel>(API_TOKEN).to(ApiService)
