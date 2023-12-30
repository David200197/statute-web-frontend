import type { Exception } from '@/common/abstracts/extension.abstract'
import type { StatuteModel } from './statute.model'
import type { Either } from '@/common/lib/either.lib'
import type { FindAllDto } from '@/common/dto/find-all.dto'
import type { StatutesModelResponseDto } from '../dto/statutes-model-response.dto'
import type { CreateStatuteDto } from '../dto/create-statute.dto'
import type { UpdateStatuteDto } from '../dto/update-statute.dto'

export interface StatuteServiceModel {
  findOne(uuid: string): Promise<Either<Exception, StatuteModel>>
  findAll(options?: FindAllDto): Promise<StatutesModelResponseDto>
  create(options: CreateStatuteDto): Promise<Either<Exception, StatuteModel>>
  updateOne(uuid: string, options: UpdateStatuteDto): Promise<Either<Exception, StatuteModel>>
  removeOne(uuid: string): Promise<Either<Exception, StatuteModel>>
}
