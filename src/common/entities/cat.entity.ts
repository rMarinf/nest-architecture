import { Exclude, Expose } from 'class-transformer';

export class CatEntity {
  private name: string;
  private age: number;
  private breed: string;

  @Exclude()
  private _id: string;

  @Exclude()
  private __v: string;

  @Expose()
  get hash(): string {
    return `${this._id}`;
  }

  constructor(partial: Partial<CatEntity>) {
    Object.assign(this, partial);
  }
}
