import * as chai from 'chai';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Cat } from '../src/common/interfaces/cat/cat.interface';
import { CreateCatDto } from '../src/cats/dtos/create-cat.dto';
import { UpdateCatDto } from '../src/cats/dtos/update-cat.dto';

const should = chai.should();

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let cat: Cat;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/cats (POST)', () => {
    const createCatDto: CreateCatDto = {
      name: 'example',
      age: 12,
      breed: 'example',
    };

    return request(app.getHttpServer())
      .post('/cats')
      .send(createCatDto)
      .expect(201)
      .then((res) => {
        res.body.should.be.have.property('name', createCatDto.name);
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

  it('/cats/:id (GET)', () => {
    return request(app.getHttpServer())
      .get(`/cats/${cat.hash}`)
      .expect(200)
      .then((res) => {
        res.body.should.be.deep.equal(cat);
      });
  });

  it('/cats/:id (PATCH)', () => {
    const updateCatDto: UpdateCatDto = {
      name: 'name',
      age: 12,
      breed: 'breed',
    };

    return request(app.getHttpServer())
      .patch(`/cats/${cat.hash}`)
      .send(updateCatDto)
      .expect(200)
      .then((res) => {
        res.body.should.be.have.property('name', updateCatDto.name);
        res.body.should.be.have.property('age', updateCatDto.age);
        res.body.should.be.have.property('breed', updateCatDto.breed);
      });
  });

  it('/cats/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/cats/${cat.hash}`)
      .expect(204);
  });
});
