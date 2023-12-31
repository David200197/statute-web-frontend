import { containerDI } from '@/modules/di'
import { TokenControlService } from './token-control.service'
import type { TokenControlServiceModel } from './token-control-service.model'

export const TOKEN_CONTROL_SERVICE_TOKEN = 'TOKEN_CONTROL_SERVICE_TOKEN'
containerDI.bind<TokenControlServiceModel>(TOKEN_CONTROL_SERVICE_TOKEN).to(TokenControlService)
