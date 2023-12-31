import type { FindAllDto } from '@/common/dto/find-all.dto'
import type { AllAboutUsModelResponseDto } from '../dto/all-about-us-model-response.dto'
import type { CreateAboutUsDto } from '../dto/create-about-us.dto'
import type { UpdateAboutUsDto } from '../dto/update-about-us.dto'
import type { AboutUsModel } from './about-us.model'

export interface AboutUsControllerModel {
  findAll(options?: FindAllDto): Promise<AllAboutUsModelResponseDto>
  findOne(uuid: string): Promise<AboutUsModel>
  create(options: CreateAboutUsDto): Promise<AboutUsModel>
  update(uuid: string, options: UpdateAboutUsDto): Promise<AboutUsModel>
  delete(uuid: string): Promise<AboutUsModel>
}
