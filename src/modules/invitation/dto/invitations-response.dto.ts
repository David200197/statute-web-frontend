import type { ResponseWithPaginate } from '@/common/interfaces/response-with-paginate'
import type { InvitationProps } from '../models/invitation.model'

export interface InvitationsResponseDto extends ResponseWithPaginate {
  invitations: InvitationProps[]
}
