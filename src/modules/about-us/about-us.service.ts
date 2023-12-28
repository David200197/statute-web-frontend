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
import { TOKEN_CONTROL_TOKEN } from '../shared/token-control/token-control.di'
import type { TokenControlServiceModel } from '../shared/token-control/token-control-service.model'
import environment from '@/configs/environment'
import { AboutUs } from './entities/about-us'
import { AllAboutUs } from './entities/all-about-us'
import { UrlSerializer } from '@/common/lib/url-serializer.lib'

@injectable()
export class AboutUsService implements AboutUsServiceModel {
  private API: string

  constructor(
    @inject(HTTP_CLIENT_TOKEN) private readonly httpClientService: HttpClientServiceModel,
    @inject(TOKEN_CONTROL_TOKEN) private readonly tokenControlService: TokenControlServiceModel
  ) {
    this.API = `${environment().api}/api/aboutUs`
  }

  async findOne(uuid: string): Promise<Either<Exception, AboutUsModel>> {
    throw new Error('Method not implemented.')
    /* const { accessToken } = this.tokenControlService.getTokens()
    const url = new UrlSerializer(this.API)
    url.setParam(uuid)
    const foundedAboutUs = await this.httpClientService.get<AboutUsProps>(url.serializer(), {
      token: accessToken
    })
    const aboutUs = foundedAboutUs.map((data) => AboutUs.create(data))
    return aboutUs */
  }

  async findAll({ order, orderBy, page, perPage }: FindAllDto = {}): Promise<
    Either<Exception, ResponseWithPaginate<AllAboutUsModel>>
  > {
    throw new Error('Method not implemented.')
    /* const { accessToken } = this.tokenControlService.getTokens()
    const url = new UrlSerializer(this.API)
    if (order) url.setQuery('order', order)
    if (orderBy) url.setQuery('orderBy', orderBy)
    if (page) url.setQuery('page', page)
    if (perPage) url.setQuery('perPage', perPage)

    const foundedAllAboutUs = await this.httpClientService.get<
      ResponseWithPaginate<AboutUsProps[]>
    >(url.serializer(), { token: accessToken })

    const allAboutUs = foundedAllAboutUs.map(
      (data) =>
        ({
          entities: AllAboutUs.create(data.entities),
          totalElement: data.totalElement,
          totalPage: data.totalPage
        }) as ResponseWithPaginate<AllAboutUsModel>
    )

    return allAboutUs */
  }

  async create(options: CreateAboutUsDto): Promise<Either<Exception, AboutUsModel>> {
    throw new Error('Method not implemented.')
    /* const { accessToken } = this.tokenControlService.getTokens()
    const foundedAboutUs = await this.httpClientService.post<CreateAboutUsDto, AboutUsProps>(
      this.API,
      options,
      { token: accessToken }
    )
    const aboutUs = foundedAboutUs.map((data) => AboutUs.create(data))
    return aboutUs */
  }

  async updateOne(
    uuid: string,
    options: UpdateAboutUsDto
  ): Promise<Either<Exception, AboutUsModel>> {
    throw new Error('Method not implemented.')
    /* const { accessToken } = this.tokenControlService.getTokens()
    const url = new UrlSerializer(this.API)
    url.setParam(uuid)
    const foundedAboutUs = await this.httpClientService.post<UpdateAboutUsDto, AboutUsProps>(
      url.serializer(),
      options,
      { token: accessToken }
    )
    const aboutUs = foundedAboutUs.map((data) => AboutUs.create(data))
    return aboutUs */
  }

  async removeOne(uuid: string): Promise<Either<Exception, AboutUsModel>> {
    throw new Error('Method not implemented.')
    /*  const { accessToken } = this.tokenControlService.getTokens()
    const url = new UrlSerializer(this.API)
    url.setParam(uuid)
    const foundedAboutUs = await this.httpClientService.delete<AboutUsProps>(url.serializer(), {
      token: accessToken
    })
    const aboutUs = foundedAboutUs.map((data) => AboutUs.create(data))
    return aboutUs */
  }
}
