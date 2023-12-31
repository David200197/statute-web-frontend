import type { FindAllDto } from '@/common/dto/find-all.dto'
import type { AnniversariesResponseDto } from './dto/anniversaries-response.dto'
import type { CreateAnniversaryDto } from './dto/create-anniversary.dto'
import type { UpdateAnniversaryDto } from './dto/update-anniversary.dto'
import type { AnniversaryControllerModel } from './models/anniversary-controller.model'
import type { AnniversaryModel } from './models/anniversary.model'
import { inject, injectable } from 'inversify'
import { ADMIN_SERVICE_TOKEN } from '../admin/admin.di'
import { TOAST_SERVICE_TOKE } from '../shared/toast/toast.di'
import type { AnniversaryServiceModel } from './models/anniversary-service.model'
import type { ToastServiceModel } from '../shared/toast/toast-service.model'

@injectable()
export class AnniversaryController implements AnniversaryControllerModel {
  constructor(
    @inject(ADMIN_SERVICE_TOKEN) private readonly anniversaryService: AnniversaryServiceModel,
    @inject(TOAST_SERVICE_TOKE) private readonly toastService: ToastServiceModel
  ) {}

  async findAll(options?: FindAllDto | undefined): Promise<AnniversariesResponseDto> {
    const either = await this.anniversaryService.findAll(options)
    return either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
  }

  async findOne(uuid: string): Promise<AnniversaryModel> {
    const either = await this.anniversaryService.findOne(uuid)
    return either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
  }

  async create(options: CreateAnniversaryDto): Promise<AnniversaryModel> {
    const either = await this.anniversaryService.create(options)
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

  async update(uuid: string, options: UpdateAnniversaryDto): Promise<AnniversaryModel> {
    const either = await this.anniversaryService.updateOne(uuid, options)
    const admin = either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
    this.toastService.emitLog(`actualizado con exito`)
    return admin
  }

  async delete(uuid: string): Promise<AnniversaryModel> {
    const either = await this.anniversaryService.removeOne(uuid)
    const admin = either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
    this.toastService.emitLog(`eliminado con exito`)
    return admin
  }
}
