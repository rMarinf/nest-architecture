import * as chai from 'chai';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Cat } from '../src/common/interfaces/cat.interface';
import { CreateCatDto } from '../src/cats/dto/create-cat.dto';

const should = chai.should();

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let cat: Cat;
  let createCatDto: CreateCatDto;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    createCatDto = {
      name: 'example',
      age: 12,
      breed: 'example',
    };
  });

  it('/cats (POST)', () => {
    return request(app.getHttpServer())
      .post('/cats')
      .send(createCatDto)
      .expect(201)
      .then((res) => {
        res.body.should.be.have.property('name', 'example');
        cat = res.body;
      });
  });

  it('/cats (GET)', () => {
    return request(app.getHttpServer())
      .get('/cats')
      .expect(200)
      .then((res) => {
        res.body.data.should.be.instanceOf(Array);
        res.body.data.should.be.deep.include(cat);
      });
  });
});
