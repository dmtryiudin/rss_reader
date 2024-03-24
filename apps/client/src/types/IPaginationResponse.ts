export interface IPaginationResponse<T> {
  data: T[];
  totalCount: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [param: string]: any;
}
