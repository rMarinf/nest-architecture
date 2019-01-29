import * as chai from 'chai';

import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dtos/create-cat.dto';
import { CatSchema } from './models/cat.model';
import { MongooseModule } from '@nestjs/mongoose';
import { CatEntity } from '../common/entities/cat.entity';
import { PaginationInterface } from '../common/interfaces/general/pagination.interface';
import { SortInterface } from '../common/interfaces/general/sort.interface';
import { UpdateCatDto } from './dtos/update-cat.dto';

const should = chai.should();

describe('CatController', () => {
  let app: TestingModule;
  let catService: CatsService;
  let cat: CatEntity;
  const pagination: PaginationInterface = {
    skip: 0,
    page: 1,
    limit: 10,
  };
  const sort: SortInterface = {
    createdAt: -1,
  };

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/nest-architecture'),
        MongooseModule.forFeature([{ name: 'Cat', schema: CatSchema }]),
      ],
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();
    catService = app.get<CatsService>(CatsService);
  });

  describe('[API]', () => {
    it('Create a Cat', async () => {
      const createCatDto: CreateCatDto = {
        name: 'example',
        age: 12,
        breed: 'example',
      };
      cat = await catService.create(createCatDto);
      cat.should.be.have.property('name', 'example');
    });

    it('Get all cats', async () => {
      const cats = await catService.findAll(pagination, sort);
      cats.data.should.be.instanceOf(Array);
      cats.data.should.to.deep.include(cat);
    });

    it('Get a cat', async () => {
      const result = await catService.findOne(cat.hash);
      result.should.be.deep.equal(cat);
    });

    it('Update a cat', async () => {
      const updateCatDto: UpdateCatDto = {
        name: 'name',
        age: 13,
        breed: 'name',
      };

      const updatedCat: CatEntity = await catService.update(cat.hash, updateCatDto);
      updatedCat.should.be.have.property('name', updateCatDto.name);
      updatedCat.should.be.have.property('age', updateCatDto.age);
      updatedCat.should.be.have.property('breed', updateCatDto.breed);
      cat = updatedCat;
    });

  });
});
