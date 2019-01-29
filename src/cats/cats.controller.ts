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
import { PaginationEntity } from '../common/interfaces/pagination-response.interface';
import { Sort } from '../common/decorators/sort.decorator';

@Controller('cats')
@UseInterceptors(ClassSerializerInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<CatEntity> {
    return this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(
    @Pagination() pagination,
    @Sort() sort,
  ): Promise<PaginationEntity<CatEntity>> {
    return this.catsService.findAll(pagination, sort);
  }
}
