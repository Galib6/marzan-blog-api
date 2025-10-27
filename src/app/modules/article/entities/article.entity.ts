import { BaseEntity } from '@src/app/base';
import { ENUM_COLUMN_TYPES, ENUM_TABLE_NAMES } from '@src/shared';
import { Column, Entity, Index, JoinTable, ManyToMany } from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity(ENUM_TABLE_NAMES.ARTICLES)
export class Article extends BaseEntity {
  public static readonly SEARCH_TERMS: string[] = ['title'];
  @Index()
  @Column({ length: 500, type: ENUM_COLUMN_TYPES.VARCHAR, nullable: true })
  title?: string;

  @Index()
  @Column({ length: 256, type: ENUM_COLUMN_TYPES.VARCHAR, nullable: false })
  name?: string;

  @ManyToMany(() => Category)
  @JoinTable()
  categories?: Category[];

  @Column({ type: ENUM_COLUMN_TYPES.VARCHAR, nullable: false })
  summary?: string;

  @Column({ length: 256, type: ENUM_COLUMN_TYPES.VARCHAR, nullable: false })
  thumb: string;

  @Column({ type: ENUM_COLUMN_TYPES.JSONB, nullable: false })
  content: any;

  @Column({
    type: ENUM_COLUMN_TYPES.VARCHAR,
    nullable: false,
    unique: true,
  })
  slug: string;

  @Column({ nullable: true, default: 0, type: ENUM_COLUMN_TYPES.INT })
  orderPriority?: number;
}
