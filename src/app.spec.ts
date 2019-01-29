import * as chai from 'chai';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const should = chai.should();

describe('AppController', () => {
  let app: TestingModule;
  let appService: AppService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
    appService = app.get<AppService>(AppService);
  });

  describe('[API]', () => {
    it('should return "Hello World!"', () => {
      const result = appService.getHello();
      result.should.be.have.property('welcome', 'Hello World!');
    });
  });
});
