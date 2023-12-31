import { containerDI } from '../di'
import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'
import type { AdminControllerModel } from './models/admin-controller.model'
import type { AdminServiceModel } from './models/admin-service.model'

export const ADMIN_SERVICE_TOKEN = Symbol('ADMIN_SERVICE_TOKEN')
export const ADMIN_CONTROLLER_TOKEN = Symbol('ADMIN_CONTROLLER_TOKEN')
containerDI.bind<AdminServiceModel>(ADMIN_SERVICE_TOKEN).to(AdminService)
containerDI.bind<AdminControllerModel>(ADMIN_CONTROLLER_TOKEN).to(AdminController)
export const adminController: AdminControllerModel = containerDI.get(ADMIN_CONTROLLER_TOKEN)
