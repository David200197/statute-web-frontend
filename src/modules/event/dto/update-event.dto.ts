import type { CreateEventDto } from './create-event.dto'

export interface UpdateEventDto extends Partial<CreateEventDto> {}
