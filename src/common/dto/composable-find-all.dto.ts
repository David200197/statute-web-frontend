import type { FindAllDto } from './find-all.dto'

export interface ComposableFindAllDto extends FindAllDto {
  autoFetch?: boolean
}
