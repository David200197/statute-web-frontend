import type { FindAllDto } from '@/common/dto/find-all.dto'
import type { AllAboutUsResponseDto } from './dto/all-about-us-response.dto'
import type { CreateAboutUsDto } from './dto/create-about-us.dto'
import type { UpdateAboutUsDto } from './dto/update-about-us.dto'
import type { AboutUsControllerModel } from './models/about-us-controller.model'
import type { AboutUsModel } from './models/about-us.model'
import { inject, injectable } from 'inversify'
import type { AboutUsServiceModel } from './models/about-us-service.model'
import { ABOUT_US_SERVICE_TOKEN } from './about-us.di'
import { TOAST_SERVICE_TOKE } from '../shared/toast/toast.di'
import type { ToastServiceModel } from '../shared/toast/toast-service.model'

@injectable()
export class AboutUsController implements AboutUsControllerModel {
  constructor(
    @inject(ABOUT_US_SERVICE_TOKEN) private readonly aboutUsService: AboutUsServiceModel,
    @inject(TOAST_SERVICE_TOKE) private readonly toastService: ToastServiceModel
  ) {}

  async findAll(options?: FindAllDto | undefined): Promise<AllAboutUsResponseDto> {
    const either = await this.aboutUsService.findAll(options)
    return either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
  }

  async findOne(uuid: string): Promise<AboutUsModel> {
    const either = await this.aboutUsService.findOne(uuid)
    return either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
  }

  async create(options: CreateAboutUsDto): Promise<AboutUsModel> {
    const either = await this.aboutUsService.create(options)
    const aboutUs = either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
    this.toastService.emitLog(`creado con exito`)
    return aboutUs
  }

  async update(uuid: string, options: UpdateAboutUsDto): Promise<AboutUsModel> {
    const either = await this.aboutUsService.updateOne(uuid, options)
    const aboutUs = either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
    this.toastService.emitLog(`actualizado con exito`)
    return aboutUs
  }

  async delete(uuid: string): Promise<AboutUsModel> {
    const either = await this.aboutUsService.removeOne(uuid)
    const aboutUs = either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
    this.toastService.emitLog(`borrado con exito`)
    return aboutUs
  }
}
