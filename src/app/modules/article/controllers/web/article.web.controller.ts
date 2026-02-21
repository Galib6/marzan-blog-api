import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '@src/app/decorators';
import { AuthType } from '@src/app/enums/auth-type.enum';
import { SuccessResponse } from '@src/app/types';
import { FilterArticleDTO } from '../../dtos/filter.dto';
import { Article } from '../../entities/article.entity';
import { ArticleService } from '../../services/article.service';

@ApiTags('Articles')
@Auth(AuthType.None)
@Controller('web/articles')
export class WebArticleController {
  RELATIONS = ['categories', 'topics'];

  constructor(private readonly service: ArticleService) {}

  @Get()
  async findAll(@Query() query: FilterArticleDTO): Promise<SuccessResponse | Article[]> {
    return this.service.findAllWithFilter(query, { relations: this.RELATIONS });
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Article> {
    return this.service.findByIdBase(id, { relations: this.RELATIONS });
  }
}
