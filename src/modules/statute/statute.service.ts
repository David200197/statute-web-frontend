import type { Exception } from '@/common/abstracts/extension.abstract'
import type { FindAllDto } from '@/common/dto/find-all.dto'
import type { Either } from '@/common/lib/either.lib'
import type { CreateStatuteDto } from './dto/create-statute.dto'
import type { StatutesModelResponseDto } from './dto/statutes-model-response.dto'
import type { UpdateStatuteDto } from './dto/update-statute.dto'
import type { StatuteServiceModel } from './models/statute-service.model'
import type { StatuteModel } from './models/statute.model'
import { injectable } from 'inversify'

@injectable()
export class StatuteService implements StatuteServiceModel {
  findOne(uuid: string): Promise<Either<Exception, StatuteModel>> {
    throw new Error('Method not implemented.')
  }
  findAll(options?: FindAllDto | undefined): Promise<StatutesModelResponseDto> {
    throw new Error('Method not implemented.')
  }
  create(options: CreateStatuteDto): Promise<Either<Exception, StatuteModel>> {
    throw new Error('Method not implemented.')
  }
  updateOne(uuid: string, options: UpdateStatuteDto): Promise<Either<Exception, StatuteModel>> {
    throw new Error('Method not implemented.')
  }
  removeOne(uuid: string): Promise<Either<Exception, StatuteModel>> {
    throw new Error('Method not implemented.')
  }
}
