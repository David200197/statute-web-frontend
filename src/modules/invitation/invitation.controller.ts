import { inject, injectable } from 'inversify'
import type { InvitationControllerModel } from './models/invitation-controller.model'
import type { FindAllDto } from '@/common/dto/find-all.dto'
import type { CreateInvitationDto } from './dto/create-invitation.dto'
import type { InvitationsResponseDto } from './dto/invitations-response.dto'
import type { UpdateInvitationDto } from './dto/update-invitation.dto'
import type { InvitationModel } from './models/invitation.model'
import { EVENT_SERVICE_TOKEN } from '../event/event.di'
import { TOAST_SERVICE_TOKE } from '../shared/toast/toast.di'
import type { InvitationServiceModel } from './models/invitation-service.model'
import type { ToastServiceModel } from '../shared/toast/toast-service.model'

@injectable()
export class InvitationController implements InvitationControllerModel {
  constructor(
    @inject(EVENT_SERVICE_TOKEN) private readonly invitationService: InvitationServiceModel,
    @inject(TOAST_SERVICE_TOKE) private readonly toastService: ToastServiceModel
  ) {}

  async findAll(options?: FindAllDto): Promise<InvitationsResponseDto> {
    const either = await this.invitationService.findAll(options)
    return either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
  }

  async findOne(uuid: string): Promise<InvitationModel> {
    const either = await this.invitationService.findOne(uuid)
    return either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
  }

  async create(options: CreateInvitationDto): Promise<InvitationModel> {
    const either = await this.invitationService.create(options)
    const invitation = either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
    this.toastService.emitLog(`creado con exito`)
    return invitation
  }

  async update(uuid: string, options: UpdateInvitationDto): Promise<InvitationModel> {
    const either = await this.invitationService.updateOne(uuid, options)
    const invitation = either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
    this.toastService.emitLog(`actualizado con exito`)
    return invitation
  }

  async delete(uuid: string): Promise<InvitationModel> {
    const either = await this.invitationService.removeOne(uuid)
    const invitation = either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
    this.toastService.emitLog(`eliminado con exito`)
    return invitation
  }
}
