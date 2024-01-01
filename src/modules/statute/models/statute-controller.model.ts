import type { StatuteModel } from './statute.model'
import type { FindAllDto } from '@/common/dto/find-all.dto'
import type { StatutesResponseDto } from '../dto/statutes-response.dto'
import type { CreateStatuteDto } from '../dto/create-statute.dto'
import type { UpdateStatuteDto } from '../dto/update-statute.dto'

export interface StatuteControllerModel {
  findOne(uuid: string): Promise<StatuteModel>
  findAll(options?: FindAllDto): Promise<StatutesResponseDto>
  create(options: CreateStatuteDto): Promise<StatuteModel>
  update(uuid: string, options: UpdateStatuteDto): Promise<StatuteModel>
  delete(uuid: string): Promise<StatuteModel>
}
