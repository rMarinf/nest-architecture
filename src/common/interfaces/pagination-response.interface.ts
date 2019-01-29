export class PaginationEntity<T> {
  data: T[];
  count: number;
  totalPages: number;

  constructor(partial: Partial<PaginationEntity<T>>) {
    Object.assign(this, partial);
  }
}
