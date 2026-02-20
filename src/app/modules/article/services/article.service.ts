import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@src/app/base/base.service';
import { IFindAllBaseOptions } from '@src/app/interfaces';
import { SuccessResponse } from '@src/app/types';
import { In, Repository } from 'typeorm';
import { CategoryService } from '../../category/services/category.service';
import { TopicService } from '../../topic/services/topic.service';
import { FilterArticleDTO } from '../dtos/filter.dto';
import { UpdateArticleDTO } from '../dtos/update.dto';
import { Article } from '../entities/article.entity';

@Injectable()
export class ArticleService extends BaseService<Article> {
  constructor(
    @InjectRepository(Article)
    public readonly _repo: Repository<Article>,
    // private readonly dataSource: DataSource
    private readonly categoryService: CategoryService,
    private readonly topicService: TopicService
  ) {
    super(_repo);
  }

  async updateOne(id: string, payload: UpdateArticleDTO): Promise<Article> {
    const { categories, topics, ...restPayload } = payload;

    // Fetch the existing article
    const article = await this.repo.findOne({
      where: { id },
      relations: ['categories', 'topics'],
    });
    if (!article) {
      throw new Error('Article not found');
    }

    Object.assign(article, restPayload);

    if (categories && categories.length) {
      const categoryItems = await this.categoryService.find({
        where: {
          id: In(categories.map((item) => item.id)),
        },
      });
      article.categories = categoryItems;
    }

    if (topics && topics.length) {
      const topicItems = await this.topicService.find({
        where: {
          id: In(topics.map((item) => item.id)),
        },
      });
      article.topics = topicItems;
    }

    // Save the updated article
    return await this.repo.save(article);
  }

  /**
   * Applies optional category/topic filtering before delegating to BaseService.
   */
  async findAllWithFilter(
    query: FilterArticleDTO,
    options?: IFindAllBaseOptions
  ): Promise<SuccessResponse | Article[]> {
    const { categoryId, topicId, ...rest } = query as any;
    const filters: any = { ...rest };

    if (categoryId) {
      // convert to relation filter recognized by BaseService
      filters.categories = categoryId;
    }
    if (topicId) {
      filters.topics = topicId;
    }

    return this.findAllBase(filters, options);
  }
}
