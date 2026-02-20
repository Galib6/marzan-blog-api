import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@src/app/base/base.service';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

export interface ICategoryArticleCount {
  id: string;
  title?: string;
  articleCount: number;
}

@Injectable()
export class CategoryService extends BaseService<Category> {
  constructor(
    @InjectRepository(Category)
    public readonly _repo: Repository<Category>
    // private readonly dataSource: DataSource
  ) {
    super(_repo);
  }

  /**
   * Return each category along with the number of articles associated with it.
   */
  async groupByArticle(): Promise<ICategoryArticleCount[]> {
    const rows = await this._repo
      .createQueryBuilder('category')
      .leftJoin('category.articles', 'article')
      .select(['category.id AS id', 'category.title AS title'])
      .addSelect('COUNT(article.id) AS "articleCount"')
      .groupBy('category.id')
      .getRawMany();

    // Raw results come back as strings for counts, convert them
    return rows.map((r) => ({
      id: r.id,
      title: r.title,
      articleCount: Number(r.articleCount) || 0,
    }));
  }
}
