import { inject, injectable } from 'inversify'
import type { SocialNetworkControllerModel } from './models/social-network-controller.model'
import type { FindAllDto } from '@/common/dto/find-all.dto'
import type { CreateSocialNetworkDto } from './dto/create-social-network.dto'
import type { SocialNetworksResponseDto } from './dto/social-networks-response.dto'
import type { UpdateSocialNetworkDto } from './dto/update-social-network.dto'
import type { SocialNetworkModel } from './models/social-network.model'
import { SOCIAL_NETWORK_SERVICE_TOKEN } from './social-network.di'
import type { SocialNetworkServiceModel } from './models/social-network-service.model'
import { TOAST_SERVICE_TOKE } from '../shared/toast/toast.di'
import type { ToastServiceModel } from '../shared/toast/toast-service.model'

@injectable()
export class SocialNetworkController implements SocialNetworkControllerModel {
  constructor(
    @inject(SOCIAL_NETWORK_SERVICE_TOKEN)
    private readonly socialNetworkService: SocialNetworkServiceModel,
    @inject(TOAST_SERVICE_TOKE) private readonly toastService: ToastServiceModel
  ) {}

  async findAll(options?: FindAllDto): Promise<SocialNetworksResponseDto> {
    const either = await this.socialNetworkService.findAll(options)
    return either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
  }

  async findOne(uuid: string): Promise<SocialNetworkModel> {
    const either = await this.socialNetworkService.findOne(uuid)
    return either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
  }

  async getAllTypeSocialNetworks(): Promise<string[]> {
    const either = await this.socialNetworkService.getAllTypeSocialNetworks()
    return either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
  }

  async create(options: CreateSocialNetworkDto): Promise<SocialNetworkModel> {
    const either = await this.socialNetworkService.create(options)
    const socialNetwork = either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
    this.toastService.emitLog(`creado con exito`)
    return socialNetwork
  }

  async update(uuid: string, options: UpdateSocialNetworkDto): Promise<SocialNetworkModel> {
    const either = await this.socialNetworkService.updateOne(uuid, options)
    const socialNetwork = either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
    this.toastService.emitLog(`actualizado con exito`)
    return socialNetwork
  }

  async delete(uuid: string): Promise<SocialNetworkModel> {
    const either = await this.socialNetworkService.removeOne(uuid)
    const socialNetwork = either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
    this.toastService.emitLog(`eliminado con exito`)
    return socialNetwork
  }
}
