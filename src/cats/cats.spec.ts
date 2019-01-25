import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatSchema } from './schemas/cat.model';
import { MongooseModule } from '@nestjs/mongoose';
import * as chai from 'chai';

const should = chai.should();

describe('CatController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/nest-architecture'),
        MongooseModule.forFeature([{ name: 'Cat', schema: CatSchema }]),
      ],
      controllers: [CatsController],
      providers: [
        CatsService,
      ],
    }).compile();
  });

  describe('[API]', () => {
    it('Create a Cat', async () => {
      const catController = app.get<CatsService>(CatsService);
      const createCatDto: CreateCatDto = {
        name : 'example',
        age: 12,
        breed: 'example',
      };
      const cat = await catController.create(createCatDto);
      cat.should.be.have.property('name', 'example');
    });
  });
});
