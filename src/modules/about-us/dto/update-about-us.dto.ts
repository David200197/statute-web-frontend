import type { DeepPartial } from '@/common/interfaces/deep-partial'
import type { CreateAboutUsDto } from './create-about-us.dto'
export interface UpdateAboutUsDto extends DeepPartial<CreateAboutUsDto> {}
