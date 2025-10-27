import { BaseEntity } from '@src/app/base';
import { ENUM_COLUMN_TYPES, ENUM_TABLE_NAMES } from '@src/shared';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Article } from '../../article/entities/article.entity';

@Entity(ENUM_TABLE_NAMES.BANNERS)
export class Banner extends BaseEntity {
  public static readonly SEARCH_TERMS: string[] = [];

  @OneToOne(() => Article)
  @JoinColumn()
  article?: Article;

  @Column({ type: ENUM_COLUMN_TYPES.UUID })
  articleId: string;

  @Column({ nullable: true, default: 0, type: ENUM_COLUMN_TYPES.INT })
  orderPriority?: number;
}
