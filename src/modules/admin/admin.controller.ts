import type { FindAllDto } from '@/common/dto/find-all.dto'
import type { AdminsResponseDto } from './dto/admins-response.dto'
import type { CreateAdminDto } from './dto/create-admin.dto'
import type { UpdateAdminDto } from './dto/update-admin.dto'
import type { AdminControllerModel } from './models/admin-controller.model'
import type { AdminModel } from './models/admin.model'
import { inject, injectable } from 'inversify'
import { TOAST_SERVICE_TOKE } from '../shared/toast/toast.di'
import { ADMIN_SERVICE_TOKEN } from './admin.di'
import type { ToastServiceModel } from '../shared/toast/toast-service.model'
import type { AdminServiceModel } from './models/admin-service.model'

@injectable()
export class AdminController implements AdminControllerModel {
  constructor(
    @inject(ADMIN_SERVICE_TOKEN) private readonly adminService: AdminServiceModel,
    @inject(TOAST_SERVICE_TOKE) private readonly toastService: ToastServiceModel
  ) {}

  async findAll(options: FindAllDto = {}): Promise<AdminsResponseDto> {
    const either = await this.adminService.findAll(options)
    return either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
  }

  async findOne(username: string): Promise<AdminModel> {
    const either = await this.adminService.findOne(username)
    return either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
  }

  async create(options: CreateAdminDto): Promise<AdminModel> {
    const either = await this.adminService.create(options)
    const admin = either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
    this.toastService.emitLog(`creado con exito`)
    return admin
  }

  async update(username: string, options: UpdateAdminDto): Promise<AdminModel> {
    const either = await this.adminService.updateOne(username, options)
    const admin = either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
    this.toastService.emitLog(`creado con exito`)
    return admin
  }

  async delete(username: string): Promise<AdminModel> {
    const either = await this.adminService.removeOne(username)
    const admin = either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
    this.toastService.emitLog(`creado con exito`)
    return admin
  }
}
