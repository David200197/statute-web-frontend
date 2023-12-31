import type { AnniversaryModel } from './anniversary.model'
import type { FindAllDto } from '@/common/dto/find-all.dto'
import type { AnniversariesResponseDto } from '../dto/anniversaries-response.dto'
import type { CreateAnniversaryDto } from '../dto/create-anniversary.dto'
import type { UpdateAnniversaryDto } from '../dto/update-anniversary.dto'

export interface AnniversaryControllerModel {
  findOne(uuid: string): Promise<AnniversaryModel>
  findAll(options?: FindAllDto): Promise<AnniversariesResponseDto>
  create(options: CreateAnniversaryDto): Promise<AnniversaryModel>
  update(uuid: string, options: UpdateAnniversaryDto): Promise<AnniversaryModel>
  delete(uuid: string): Promise<AnniversaryModel>
}
