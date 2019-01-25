import { Controller, Get, Post, Body, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { CatEntity } from './interfaces/cat.model';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<CatEntity> {
    const cat = await this.catsService.create(createCatDto);
    return new CatEntity(cat);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
