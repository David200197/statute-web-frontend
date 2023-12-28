import { containerDI } from '../di'
import { AdminService } from './admin.service'
import type { AdminServiceModel } from './models/admin-service.model'

export const ADMIN_TOKEN = Symbol('ADMIN_TOKEN')
containerDI.bind<AdminServiceModel>(ADMIN_TOKEN).to(AdminService)
export const adminService: AdminServiceModel = containerDI.get(ADMIN_TOKEN)
