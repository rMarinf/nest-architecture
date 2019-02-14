import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from '../common/interfaces/cat/cat.interface';
import { CreateCatDto } from './dtos/create-cat.dto';
import { PaginationInterface } from '../common/interfaces/general/pagination.interface';
import { PaginationEntity } from '../common/entities/pagination.entity';
import { CatEntity } from '../common/entities/cat.entity';
import { SortInterface } from '../common/interfaces/general/sort.interface';
import { UpdateCatDto } from './dtos/update-cat.dto';
import { CatQueryDto } from './dtos/cat.query.dto';
import { CatQueryInterface } from '../common/interfaces/cat/cat.query.interface';

@Injectable()
export class CatsService {
  constructor(@InjectModel('Cat') private readonly catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<CatEntity> {
    const createdCat = new this.catModel(createCatDto);
    await createdCat.save();
    return new CatEntity(createdCat.toObject());
  }

  async findAll(
    query: CatQueryDto,
    pagination: PaginationInterface,
    sort: SortInterface,
  ): Promise<PaginationEntity<CatEntity>> {
    const parsedQuery = this.parseQuery(query);
    const [results, itemCount] = await Promise.all([
      this.catModel
        .find(parsedQuery)
        .limit(pagination.limit)
        .skip(pagination.skip)
        .sort(sort)
        .lean()
        .exec(),
      this.catModel.count(parsedQuery),
    ]);

    const pageCount = Math.ceil(itemCount / pagination.limit);
    const cats: CatEntity[] = [];
    results.forEach(cat => {
      cats.push(new CatEntity(cat));
    });

    return new PaginationEntity<CatEntity>({
      data: cats,
      count: itemCount,
      totalPages: pageCount,
    });
  }

  async findOne(hash: string): Promise<CatEntity> {
    try {
      const cat = await this.catModel.findOne({ hash }).lean();
      return cat ? new CatEntity(cat) : null;
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async update(
    updatedCat: CatEntity,
    updateCatDto: UpdateCatDto,
  ): Promise<CatEntity> {
    const cat = await this.catModel.findOne({ hash: updatedCat.hash });
    cat.set(updateCatDto);
    await cat.save();
    return new CatEntity(cat.toObject());
  }

  async delete(cat: CatEntity): Promise<boolean> {
    const deletedCat = await this.catModel.findOneAndDelete({ hash: cat.hash });
    return !!deletedCat;
  }

  private parseQuery(query: CatQueryDto) {
    const parsedQuery: CatQueryInterface = {};

    if (query.name) {
      parsedQuery.name = {$regex: query.name, $options: '$i'};
    }

    if (query.breed) {
      parsedQuery.breed = {$regex: query.breed, $options: '$i'};
    }

    return parsedQuery;
  }
}
