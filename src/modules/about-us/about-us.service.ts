import { inject, injectable } from 'inversify'
import type { FindAllDto } from '@/common/dto/find-all.dto'
import type { CreateAboutUsDto } from './dto/create-about-us.dto'
import type { UpdateAboutUsDto } from './dto/update-about-us.dto'
import type { AboutUsServiceModel } from './models/about-us-service.model'
import type { AboutUsModel, AboutUsProps } from './models/about-us.model'
import type { Either } from '@/common/lib/either.lib'
import type { Exception } from '@/common/abstracts/extension.abstract'
import { AboutUs } from './entities/about-us'
import { AllAboutUs } from './entities/all-about-us'
import { API_TOKEN } from '../api/api.di'
import type { ApiServiceModel } from '../api/api-service.model'
import type { AllAboutUsResponseDto } from './dto/all-about-us-response.dto'
import type { AllAboutUsModelResponseDto } from './dto/all-about-us-model-response.dto'

@injectable()
export class AboutUsService implements AboutUsServiceModel {
  constructor(@inject(API_TOKEN) private readonly apiService: ApiServiceModel) {}

  async findOne(uuid: string): Promise<Either<Exception, AboutUsModel>> {
    const aboutUs = await this.apiService.get<AboutUsProps>('about-us', {
      params: [uuid]
    })
    return aboutUs.map((data) => AboutUs.create(data))
  }

  async findAll({ order, orderBy, page, perPage }: FindAllDto = {}): Promise<
    Either<Exception, AllAboutUsModelResponseDto>
  > {
    const queries: Record<string, string> = {}
    if (order) queries['order'] = order
    if (orderBy) queries['orderBy'] = orderBy
    if (page) queries['page'] = page
    if (perPage) queries['perPage'] = perPage

    const response = await this.apiService.get<{
      data: AllAboutUsResponseDto
    }>('about-us', { queries })

    return response.map<AllAboutUsModelResponseDto>(({ data }) => ({
      allAboutUs: AllAboutUs.create(data.allAboutUs),
      totalElement: data.totalElement,
      totalPage: data.totalPage
    }))
  }

  async create(options: CreateAboutUsDto): Promise<Either<Exception, AboutUsModel>> {
    const aboutUs = await this.apiService.post<CreateAboutUsDto, AboutUsProps>('about-us', options)
    return aboutUs.map((data) => AboutUs.create(data))
  }

  async updateOne(
    uuid: string,
    options: UpdateAboutUsDto
  ): Promise<Either<Exception, AboutUsModel>> {
    const aboutUs = await this.apiService.patch<UpdateAboutUsDto, AboutUsProps>(
      'about-us',
      options,
      { params: [uuid] }
    )
    return aboutUs.map((data) => AboutUs.create(data))
  }

  async removeOne(uuid: string): Promise<Either<Exception, AboutUsModel>> {
    const aboutUs = await this.apiService.delete<AboutUsProps>('about-us', {
      params: [uuid]
    })
    return aboutUs.map((data) => AboutUs.create(data))
  }
}
