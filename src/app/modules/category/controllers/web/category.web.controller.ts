import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from '@src/app/types';
import { FilterCategoryDTO } from '../../dtos/filter.dto';
import { Category } from '../../entities/category.entity';
import { CategoryService } from '../../services/category.service';

@ApiTags('Category')
@ApiBearerAuth()
@Controller('web/categories')
export class WebCategoryController {
  RELATIONS = [];

  constructor(private readonly service: CategoryService) {}

  @Get('group-by-article')
  async groupByArticle(): Promise<{ id: string; title?: string; articleCount: number }[]> {
    return this.service.groupByArticle();
  }

  @Get()
  async findAll(@Query() query: FilterCategoryDTO): Promise<SuccessResponse | Category[]> {
    return this.service.findAllBase(query, { relations: this.RELATIONS });
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Category> {
    return this.service.findByIdBase(id, { relations: this.RELATIONS });
  }
}
