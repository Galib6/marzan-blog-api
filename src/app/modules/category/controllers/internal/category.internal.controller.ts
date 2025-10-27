import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from '@src/app/types';
import { CreateCategoryDTO } from '../../dtos/create.dto';
import { FilterCategoryDTO } from '../../dtos/filter.dto';
import { UpdateCategoryDTO } from '../../dtos/update.dto';
import { Category } from '../../entities/category.entity';
import { CategoryService } from '../../services/category.service';

@ApiTags('Category')
@ApiBearerAuth()
@Controller('internal/categories')
export class InternalCategoryController {
  RELATIONS = [];

  constructor(private readonly service: CategoryService) {}

  @Get()
  async findAll(@Query() query: FilterCategoryDTO): Promise<SuccessResponse | Category[]> {
    return this.service.findAllBase(query, { relations: this.RELATIONS });
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Category> {
    return this.service.findByIdBase(id, { relations: this.RELATIONS });
  }

  @Post()
  async createOne(
    @Body() body: CreateCategoryDTO
    // @ActiveUser() authUser: IActiveUser
  ): Promise<Category> {
    return this.service.createOneBase(body, { relations: this.RELATIONS });
  }

  @Patch(':id')
  async updateOne(@Param('id') id: string, @Body() body: UpdateCategoryDTO): Promise<Category> {
    return this.service.updateOneBase(id, body, { relations: this.RELATIONS });
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number): Promise<SuccessResponse> {
    return this.service.softDeleteOneBase(id);
  }
}
