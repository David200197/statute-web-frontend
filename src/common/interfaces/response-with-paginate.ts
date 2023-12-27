export type ResponseWithPaginate<T> = {
  entities: T;
  totalElement: number;
  totalPage: number;
};
