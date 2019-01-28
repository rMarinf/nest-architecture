import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { CatEntity } from './interfaces/cat.model';
import { Pagination } from '../common/decorators/pagination.decorator';
import { CatPaginationEntity } from '../common/interfaces/pagination-response.interface';

@Controller('cats')
@UseInterceptors(ClassSerializerInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<CatEntity> {
    return this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(@Pagination() pagination): Promise<CatPaginationEntity<CatEntity>> {
    return this.catsService.findAll(pagination);
  }
}
