import { containerDI } from '@/modules/di'
import { AuthControlService } from './auth-control.service'
import type { AuthControlServiceModel } from './auth-control-service.model'

export const AUTH_CONTROL_TOKEN = 'AUTH_CONTROL_TOKEN'
containerDI.bind<AuthControlServiceModel>(AUTH_CONTROL_TOKEN).to(AuthControlService)
