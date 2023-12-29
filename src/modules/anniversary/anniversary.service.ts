import type { Exception } from '@/common/abstracts/extension.abstract'
import type { FindAllDto } from '@/common/dto/find-all.dto'
import type { Either } from '@/common/lib/either.lib'
import type { AnniversariesModelResponseDto } from './dto/anniversaries-model-response.dto'
import type { CreateAnniversaryDto } from './dto/create-anniversary.dto'
import type { UpdateAnniversaryDto } from './dto/update-anniversary.dto'
import type { AnniversaryServiceModel } from './models/anniversary-service.model'
import type { AnniversaryModel, AnniversaryProps } from './models/anniversary.model'
import { inject, injectable } from 'inversify'
import { API_TOKEN } from '../api/api.di'
import type { ApiServiceModel } from '../api/api-service.model'
import { Anniversary } from './entities/anniversary'
import type { AnniversariesResponseDto } from './dto/anniversaries-response.dto'
import { Anniversaries } from './entities/anniversaries'

@injectable()
export class AnniversaryService implements AnniversaryServiceModel {
  constructor(@inject(API_TOKEN) private readonly apiService: ApiServiceModel) {}

  async findOne(uuid: string): Promise<Either<Exception, AnniversaryModel>> {
    const anniversary = await this.apiService.get<AnniversaryProps>('anniversary', {
      params: [uuid]
    })
    return anniversary.map((data) => Anniversary.create(data))
  }

  async findAll({ order, orderBy, page, perPage }: FindAllDto = {}): Promise<
    Either<Exception, AnniversariesModelResponseDto>
  > {
    const queries: Record<string, string> = {}
    if (order) queries['order'] = order
    if (orderBy) queries['orderBy'] = orderBy
    if (page) queries['page'] = page
    if (perPage) queries['perPage'] = perPage

    const foundedResponse = await this.apiService.get<{
      data: AnniversariesResponseDto
    }>('anniversary', { queries })

    return foundedResponse.map<AnniversariesModelResponseDto>(({ data }) => ({
      anniversaries: Anniversaries.create(data.anniversaries),
      totalElement: data.totalElement,
      totalPage: data.totalPage
    }))
  }

  async create(options: CreateAnniversaryDto): Promise<Either<Exception, AnniversaryModel>> {
    const anniversary = await this.apiService.post<CreateAnniversaryDto, AnniversaryProps>(
      'anniversary',
      options
    )
    return anniversary.map((data) => Anniversary.create(data))
  }

  async updateOne(
    uuid: string,
    options: UpdateAnniversaryDto
  ): Promise<Either<Exception, AnniversaryModel>> {
    const anniversary = await this.apiService.patch<CreateAnniversaryDto, AnniversaryProps>(
      'anniversary',
      options,
      { params: [uuid] }
    )
    return anniversary.map((data) => Anniversary.create(data))
  }

  async removeOne(uuid: string): Promise<Either<Exception, AnniversaryModel>> {
    const anniversary = await this.apiService.delete<AnniversaryProps>('anniversary', {
      params: [uuid]
    })
    return anniversary.map((data) => Anniversary.create(data))
  }
}
