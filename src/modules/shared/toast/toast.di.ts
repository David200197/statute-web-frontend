import { containerDI } from '@/modules/di'
import type { ToastServiceModel } from './toast-service.model'
import { ToastJsService } from './toast-js.service'

export const TOAST_SERVICE_TOKE = Symbol('TOAST_SERVICE_TOKE')
containerDI.bind<ToastServiceModel>(TOAST_SERVICE_TOKE).to(ToastJsService)
