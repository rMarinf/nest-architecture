import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';
import { PaginationInterface } from '../common/interfaces/pagination.interface';
import { PaginationEntity } from '../common/interfaces/pagination-response.interface';
import { CatEntity } from './interfaces/cat.model';
import { SortInterface } from '../common/interfaces/sort.interface';

@Injectable()
export class CatsService {
  constructor(@InjectModel('Cat') private readonly catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<CatEntity> {
    const createdCat = new this.catModel(createCatDto);
    await createdCat.save();
    return new CatEntity(createdCat.toObject());
  }

  async findAll(
    pagination: PaginationInterface,
    sort: SortInterface,
  ): Promise<PaginationEntity<CatEntity>> {
    const [results, itemCount] = await Promise.all([
      this.catModel
        .find({})
        .limit(pagination.limit)
        .skip(pagination.skip)
        .sort(sort)
        .exec(),
      this.catModel.count({}),
    ]);

    const pageCount = Math.ceil(itemCount / pagination.limit);
    const cats: CatEntity[] = [];
    results.forEach(cat => {
      cats.push(new CatEntity(cat.toObject()));
    });

    return new PaginationEntity<CatEntity>({
      data: cats,
      count: itemCount,
      totalPages: pageCount,
    });
  }
}
