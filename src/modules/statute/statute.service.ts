import type { Exception } from '@/common/abstracts/extension.abstract'
import type { FindAllDto } from '@/common/dto/find-all.dto'
import type { Either } from '@/common/lib/either.lib'
import type { CreateStatuteDto } from './dto/create-statute.dto'
import type { StatutesResponseDto } from './dto/statutes-response.dto'
import type { UpdateStatuteDto } from './dto/update-statute.dto'
import type { StatuteServiceModel } from './models/statute-service.model'
import type { StatuteModel, StatuteProps } from './models/statute.model'
import { inject, injectable } from 'inversify'
import { API_TOKEN } from '../api/api.di'
import type { ApiServiceModel } from '../api/api-service.model'
import { Statute } from './entities/statute'
import type { StatutesPropsResponseDto } from './dto/statutes-props-response.dto'
import { Statutes } from './entities/statutes'

@injectable()
export class StatuteService implements StatuteServiceModel {
  constructor(@inject(API_TOKEN) private readonly apiService: ApiServiceModel) {}

  async findOne(uuid: string): Promise<Either<Exception, StatuteModel>> {
    const statute = await this.apiService.get<StatuteProps>('statute', {
      params: [uuid]
    })
    return statute.map((data) => Statute.create(data))
  }

  async findAll({ order, orderBy, page, perPage }: FindAllDto = {}): Promise<
    Either<Exception, StatutesResponseDto>
  > {
    const queries: Record<string, string> = {}
    if (order) queries['order'] = order
    if (orderBy) queries['orderBy'] = orderBy
    if (page) queries['page'] = page
    if (perPage) queries['perPage'] = perPage

    const foundedResponse = await this.apiService.get<{
      data: StatutesPropsResponseDto
    }>('statute', { queries })

    return foundedResponse.map<StatutesResponseDto>(({ data }) => ({
      statutes: Statutes.create(data.statutes),
      totalElement: data.totalElement,
      totalPage: data.totalPage
    }))
  }

  async create(options: CreateStatuteDto): Promise<Either<Exception, StatuteModel>> {
    const statute = await this.apiService.post<CreateStatuteDto, StatuteProps>('statute', options)
    return statute.map((data) => Statute.create(data))
  }

  async updateOne(
    uuid: string,
    options: UpdateStatuteDto
  ): Promise<Either<Exception, StatuteModel>> {
    const statute = await this.apiService.patch<CreateStatuteDto, StatuteProps>(
      'statute',
      options,
      { params: [uuid] }
    )
    return statute.map((data) => Statute.create(data))
  }

  async removeOne(uuid: string): Promise<Either<Exception, StatuteModel>> {
    const statute = await this.apiService.delete<StatuteProps>('statute', {
      params: [uuid]
    })
    return statute.map((data) => Statute.create(data))
  }
}
