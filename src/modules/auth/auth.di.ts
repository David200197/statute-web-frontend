import { containerDI } from '../di'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import type { AuthControllerModel } from './models/auth-controller.model'
import type { AuthServiceModel } from './models/auth-service.model'

export const AUTH_SERVICE_TOKEN = Symbol('AUTH_SERVICE_TOKEN')
export const AUTH_CONTROLLER_TOKEN = Symbol('AUTH_CONTROLLER_TOKEN')
containerDI.bind<AuthServiceModel>(AUTH_SERVICE_TOKEN).to(AuthService)
containerDI.bind<AuthControllerModel>(AUTH_CONTROLLER_TOKEN).to(AuthController)
export const authController: AuthControllerModel = containerDI.get(AUTH_CONTROLLER_TOKEN)
