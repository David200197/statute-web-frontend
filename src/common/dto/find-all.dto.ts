export enum Order {
  ASC = 'ASC',
  DESC = 'DESC'
}

export interface FindAllDto {
  page?: string
  perPage?: string
  order?: Order
  orderBy?: string
}
