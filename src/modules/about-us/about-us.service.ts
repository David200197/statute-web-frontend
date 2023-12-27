import { inject, injectable } from 'inversify'
import type { FindAllDto } from '@/common/dto/find-all.dto'
import type { ResponseWithPaginate } from '@/common/interfaces/response-with-paginate'
import type { CreateAboutUsDto } from './dto/create-about-us.dto'
import type { UpdateAboutUsDto } from './dto/update-about-us.dto'
import type { AboutUsServiceModel } from './models/about-us-service.model'
import type { AboutUsModel, AboutUsProps } from './models/about-us.model'
import type { AllAboutUsModel } from './models/all-about-us.model'
import type { Either } from '@/common/lib/either.lib'
import type { Exception } from '@/common/abstracts/extension.abstract'
import type { HttpClientServiceModel } from '../shared/http-client/http-client-service.model'
import { HTTP_CLIENT_TOKEN } from '../shared/http-client/http-client.di'
import { AUTH_CONTROL_TOKEN } from '../shared/auth-control/auth-control.di'
import type { AuthControlServiceModel } from '../shared/auth-control/auth-control-service.model'
import environment from '@/configs/environment'
import { AboutUs } from './entities/about-us'
import { AllAboutUs } from './entities/all-about-us'

@injectable()
export class AboutUsService implements AboutUsServiceModel {
  constructor(
    @inject(HTTP_CLIENT_TOKEN) private readonly httpClientService: HttpClientServiceModel,
    @inject(AUTH_CONTROL_TOKEN) private readonly authControlService: AuthControlServiceModel
  ) {}

  async findOne(uuid: string): Promise<Either<Exception, AboutUsModel>> {
    const { accessToken } = this.authControlService.getTokens()
    const foundedAboutUs = await this.httpClientService.get<AboutUsProps>(
      `${environment().api}/api/aboutUs/${uuid}`,
      { token: accessToken }
    )
    const aboutUs = foundedAboutUs.map((data) => AboutUs.create(data))
    return aboutUs
  }

  async findAll({ order, orderBy, page, perPage }: FindAllDto = {}): Promise<
    Either<Exception, ResponseWithPaginate<AllAboutUsModel>>
  > {
    const { accessToken } = this.authControlService.getTokens()

    const foundedAllAboutUs = await this.httpClientService.get<
      ResponseWithPaginate<AboutUsProps[]>
    >(`${environment().api}/api/aboutUs?order`, { token: accessToken })

    const allAboutUs = foundedAllAboutUs.map(
      (data) =>
        ({
          entities: AllAboutUs.create(data.entities),
          totalElement: data.totalElement,
          totalPage: data.totalPage
        }) as ResponseWithPaginate<AllAboutUsModel>
    )

    return allAboutUs
  }

  async create(options: CreateAboutUsDto): Promise<Either<Exception, AboutUsModel>> {
    const { accessToken } = this.authControlService.getTokens()
    const foundedAboutUs = await this.httpClientService.post<CreateAboutUsDto, AboutUsProps>(
      `${environment().api}/api/aboutUs`,
      options,
      { token: accessToken }
    )
    const aboutUs = foundedAboutUs.map((data) => AboutUs.create(data))
    return aboutUs
  }

  async updateOne(
    uuid: string,
    options: UpdateAboutUsDto
  ): Promise<Either<Exception, AboutUsModel>> {
    const { accessToken } = this.authControlService.getTokens()
    const foundedAboutUs = await this.httpClientService.post<UpdateAboutUsDto, AboutUsProps>(
      `${environment().api}/api/aboutUs/${uuid}`,
      options,
      { token: accessToken }
    )
    const aboutUs = foundedAboutUs.map((data) => AboutUs.create(data))
    return aboutUs
  }

  async removeOne(uuid: string): Promise<Either<Exception, AboutUsModel>> {
    const { accessToken } = this.authControlService.getTokens()
    const foundedAboutUs = await this.httpClientService.delete<AboutUsProps>(
      `${environment().api}/api/aboutUs/${uuid}`,
      { token: accessToken }
    )
    const aboutUs = foundedAboutUs.map((data) => AboutUs.create(data))
    return aboutUs
  }
}
