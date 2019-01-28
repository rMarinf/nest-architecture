import * as chai from 'chai';

import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatSchema } from './schemas/cat.model';
import { MongooseModule } from '@nestjs/mongoose';
import { CatEntity } from './interfaces/cat.model';

const should = chai.should();

describe('CatController', () => {
  let app: TestingModule;
  let catService: CatsService;
  let cat: CatEntity;

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
      const cats = await catService.findAll();
      cats.should.be.instanceOf(Array);
      cats.should.be.deep.include(cat);
    });
  });
});
