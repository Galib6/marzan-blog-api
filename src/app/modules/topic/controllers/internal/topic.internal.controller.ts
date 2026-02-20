import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from '@src/app/types';
import { CreateTopicDTO } from '../../dtos/create.dto';
import { FilterTopicDTO } from '../../dtos/filter.dto';
import { UpdateTopicDTO } from '../../dtos/update.dto';
import { Topic } from '../../entities/topic.entity';
import { TopicService } from '../../services/topic.service';

@ApiTags('Topic')
@ApiBearerAuth()
@Controller('internal/topics')
export class InternalTopicController {
  RELATIONS = [];

  constructor(private readonly service: TopicService) {}

  @Get('group-by-article')
  async groupByArticle(): Promise<{ id: string; title?: string; articleCount: number }[]> {
    return this.service.groupByArticle();
  }

  @Get()
  async findAll(@Query() query: FilterTopicDTO): Promise<SuccessResponse | Topic[]> {
    return this.service.findAllBase(query, { relations: this.RELATIONS });
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Topic> {
    return this.service.findByIdBase(id, { relations: this.RELATIONS });
  }

  @Post()
  async createOne(
    @Body() body: CreateTopicDTO
    // @ActiveUser() authUser: IActiveUser
  ): Promise<Topic> {
    return this.service.createOneBase(body, { relations: this.RELATIONS });
  }

  @Patch(':id')
  async updateOne(@Param('id') id: string, @Body() body: UpdateTopicDTO): Promise<Topic> {
    return this.service.updateOneBase(id, body, { relations: this.RELATIONS });
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<SuccessResponse> {
    return this.service.deleteOneBase(id);
  }
}
