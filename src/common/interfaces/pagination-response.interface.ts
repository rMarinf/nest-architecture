import { CatEntity } from '../../cats/interfaces/cat.model';

export class CatPaginationEntity<T> {
  data: CatEntity[];
  count: number;
  totalPages: number;

  constructor(partial: Partial<CatPaginationEntity<T>>) {
    Object.assign(this, partial);
  }
}
