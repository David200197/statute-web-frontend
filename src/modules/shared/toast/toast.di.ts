import { containerDI } from '@/modules/di'
import type { ToastServiceModel } from './toast-service.model'
import { ToastJsService } from './toast-js.service'

export const TOAST_TOKEN = Symbol('TOAST_TOKEN')
containerDI.bind<ToastServiceModel>(TOAST_TOKEN).to(ToastJsService)
