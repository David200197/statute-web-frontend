import type { ResponseWithPaginate } from '@/common/interfaces/response-with-paginate'
import type { InvitationsModel } from '../models/invitations.model'

export interface InvitationsModelResponseDto extends ResponseWithPaginate {
  invitations: InvitationsModel
}
