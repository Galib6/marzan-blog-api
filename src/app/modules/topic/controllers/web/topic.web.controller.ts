import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from '@src/app/types';
import { FilterTopicDTO } from '../../dtos/filter.dto';
import { Topic } from '../../entities/topic.entity';
import { TopicService } from '../../services/topic.service';

@ApiTags('Topic')
@ApiBearerAuth()
@Controller('web/topics')
export class WebTopicController {
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
}
