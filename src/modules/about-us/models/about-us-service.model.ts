import type { AboutUsModel } from './about-us.model'
import type { FindAllDto } from '@/common/dto/find-all.dto'
import type { CreateAboutUsDto } from '../dto/create-about-us.dto'
import type { UpdateAboutUsDto } from '../dto/update-about-us.dto'
import type { Either } from '@/common/lib/either.lib'
import type { Exception } from '@/common/abstracts/extension.abstract'
import type { AllAboutUsModelResponseDto } from '../dto/all-about-us-model-response.dto'

export interface AboutUsServiceModel {
  findOne(uuid: string): Promise<Either<Exception, AboutUsModel>>
  findAll(options?: FindAllDto): Promise<Either<Exception, AllAboutUsModelResponseDto>>
  create(options: CreateAboutUsDto): Promise<Either<Exception, AboutUsModel>>
  updateOne(uuid: string, options: UpdateAboutUsDto): Promise<Either<Exception, AboutUsModel>>
  removeOne(uuid: string): Promise<Either<Exception, AboutUsModel>>
}
