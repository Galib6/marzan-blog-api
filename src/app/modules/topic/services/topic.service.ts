import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@src/app/base/base.service';
import { Repository } from 'typeorm';
import { Topic } from '../entities/topic.entity';

export interface ITopicArticleCount {
  id: string;
  title?: string;
  articleCount: number;
}

@Injectable()
export class TopicService extends BaseService<Topic> {
  constructor(
    @InjectRepository(Topic)
    public readonly _repo: Repository<Topic>
    // private readonly dataSource: DataSource
  ) {
    super(_repo);
  }

  async groupByArticle(): Promise<ITopicArticleCount[]> {
    const rows = await this._repo
      .createQueryBuilder('topic')
      .leftJoin('topic.articles', 'article')
      .select(['topic.id AS id', 'topic.title AS title'])
      .addSelect('COUNT(article.id) AS "articleCount"')
      // SQL requires every non-aggregated column in the SELECT to appear in the GROUP BY
      .groupBy('topic.id')
      .addGroupBy('topic.title')
      .getRawMany();

    return rows.map((r) => ({
      id: r.id,
      title: r.title,
      articleCount: Number(r.articleCount) || 0,
    }));
  }
}
