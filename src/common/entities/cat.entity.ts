import { Exclude } from 'class-transformer';

export class CatEntity {
  name: string;
  age: number;
  breed: string;
  hash: string;

  @Exclude()
  _id: string;

  @Exclude()
  __v: string;

  constructor(partial: Partial<CatEntity>) {
    Object.assign(this, partial);
  }
}
