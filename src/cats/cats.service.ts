import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatEntity } from './interfaces/cat.model';

@Injectable()
export class CatsService {
  constructor(@InjectModel('Cat') private readonly catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<CatEntity> {
    const createdCat = new this.catModel(createCatDto);
    await createdCat.save();
    return createdCat.toObject();
  }

  async findAll(): Promise<Cat[]> {
    return await this.catModel.find().exec();
  }
}
