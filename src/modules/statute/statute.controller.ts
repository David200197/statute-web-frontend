import type { FindAllDto } from '@/common/dto/find-all.dto'
import type { CreateStatuteDto } from './dto/create-statute.dto'
import type { StatutesResponseDto } from './dto/statutes-response.dto'
import type { UpdateStatuteDto } from './dto/update-statute.dto'
import type { StatuteControllerModel } from './models/statute-controller.model'
import type { StatuteModel } from './models/statute.model'
import { inject, injectable } from 'inversify'
import { STATUTE_SERVICE_TOKEN } from './statute.di'
import type { StatuteServiceModel } from './models/statute-service.model'
import { TOAST_SERVICE_TOKE } from '../shared/toast/toast.di'
import type { ToastServiceModel } from '../shared/toast/toast-service.model'

@injectable()
export class StatuteController implements StatuteControllerModel {
  constructor(
    @inject(STATUTE_SERVICE_TOKEN)
    private readonly statuteService: StatuteServiceModel,
    @inject(TOAST_SERVICE_TOKE) private readonly toastService: ToastServiceModel
  ) {}

  async findAll(options?: FindAllDto | undefined): Promise<StatutesResponseDto> {
    const either = await this.statuteService.findAll(options)
    return either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
  }

  async findOne(uuid: string): Promise<StatuteModel> {
    const either = await this.statuteService.findOne(uuid)
    return either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
  }

  async create(options: CreateStatuteDto): Promise<StatuteModel> {
    const either = await this.statuteService.create(options)
    const statute = either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
    this.toastService.emitLog(`creado con exito`)
    return statute
  }

  async update(uuid: string, options: UpdateStatuteDto): Promise<StatuteModel> {
    const either = await this.statuteService.updateOne(uuid, options)
    const statute = either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
    this.toastService.emitLog(`actualizado con exito`)
    return statute
  }

  async delete(uuid: string): Promise<StatuteModel> {
    const either = await this.statuteService.removeOne(uuid)
    const statute = either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
    this.toastService.emitLog(`eliminado con exito`)
    return statute
  }
}
