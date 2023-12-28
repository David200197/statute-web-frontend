import { containerDI } from '../di'
import { AuthService } from './auth.service'
import type { AuthServiceModel } from './models/auth-service.model'

export const AUTH_TOKEN = Symbol('AUTH_TOKEN')
containerDI.bind<AuthServiceModel>(AUTH_TOKEN).to(AuthService)
export const authService: AuthServiceModel = containerDI.get(AUTH_TOKEN)
