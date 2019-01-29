import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { CatEntity } from '../common/entities/cat.entity';
import { Pagination } from '../common/decorators/general/pagination.decorator';
import { PaginationEntity } from '../common/entities/pagination.entity';
import { Sort } from '../common/decorators/general/sort.decorator';
import { UpdateCatDto } from './dto/update-cat.dto';

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

  @Get(':id')
  findOne(@Param('id') id) {
    return `This action returns a #${id} cat`;
  }

  @Patch(':id')
  update(@Param('id') id, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return `This action removes a #${id} cat`;
  }
}
