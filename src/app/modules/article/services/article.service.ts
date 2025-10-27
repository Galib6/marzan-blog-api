import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@src/app/base/base.service';
import { In, Repository } from 'typeorm';
import { CategoryService } from '../../category/services/category.service';
import { UpdateArticleDTO } from '../dtos/update.dto';
import { Article } from '../entities/article.entity';

@Injectable()
export class ArticleService extends BaseService<Article> {
  constructor(
    @InjectRepository(Article)
    public readonly _repo: Repository<Article>,
    // private readonly dataSource: DataSource
    private readonly categoryService: CategoryService
  ) {
    super(_repo);
  }

  async updateOne(id: string, payload: UpdateArticleDTO): Promise<Article> {
    const { categories, ...restPayload } = payload;

    // Fetch the existing article
    const article = await this.repo.findOne({
      where: { id },
      relations: ['categories'],
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

    // Save the updated article
    return await this.repo.save(article);
  }
}
