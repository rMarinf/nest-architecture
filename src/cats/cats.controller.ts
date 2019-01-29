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
  BadRequestException, HttpCode,
} from '@nestjs/common';
import { CreateCatDto } from './dtos/create-cat.dto';
import { CatsService } from './cats.service';
import { CatEntity } from '../common/entities/cat.entity';
import { Pagination } from '../common/decorators/general/pagination.decorator';
import { PaginationEntity } from '../common/entities/pagination.entity';
import { Sort } from '../common/decorators/general/sort.decorator';
import { UpdateCatDto } from './dtos/update-cat.dto';
import { Cat } from '../common/decorators/cat/cat.decorator';

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

  @Get(':cat')
  findOne(@Cat() cat: CatEntity): CatEntity {
    if (!cat) {
      throw new BadRequestException();
    }
    return cat;
  }

  @Patch(':cat')
  async update(@Cat() cat: CatEntity, @Body() updateCatDto: UpdateCatDto) {
    if (!cat) {
      throw new BadRequestException();
    }

    return this.catsService.update(cat, updateCatDto);
  }

  @Delete(':cat')
  @HttpCode(204)
  async remove(@Cat() cat: CatEntity) {
    if (!cat) {
      throw new BadRequestException();
    }

    await this.catsService.delete(cat);
  }
}
