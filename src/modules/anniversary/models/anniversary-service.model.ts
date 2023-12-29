import type { Exception } from '@/common/abstracts/extension.abstract'
import type { Either } from '@/common/lib/either.lib'
import type { AnniversaryModel } from './anniversary.model'
import type { FindAllDto } from '@/common/dto/find-all.dto'
import type { AnniversariesModelResponseDto } from '../dto/anniversaries-model-response.dto'
import type { CreateAnniversaryDto } from '../dto/create-anniversary.dto'
import type { UpdateAnniversaryDto } from '../dto/update-anniversary.dto'

export interface AnniversaryServiceModel {
  findOne(uuid: string): Promise<Either<Exception, AnniversaryModel>>
  findAll(options?: FindAllDto): Promise<Either<Exception, AnniversariesModelResponseDto>>
  create(options: CreateAnniversaryDto): Promise<Either<Exception, AnniversaryModel>>
  updateOne(
    uuid: string,
    options: UpdateAnniversaryDto
  ): Promise<Either<Exception, AnniversaryModel>>
  removeOne(uuid: string): Promise<Either<Exception, AnniversaryModel>>
}
