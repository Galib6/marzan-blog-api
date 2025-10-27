import { BaseEntity } from '@src/app/base';
import { ENUM_COLUMN_TYPES, ENUM_TABLE_NAMES } from '@src/shared';
import { Column, Entity, Index } from 'typeorm';

@Entity(ENUM_TABLE_NAMES.CATEGORIES)
export class Category extends BaseEntity {
  public static readonly SEARCH_TERMS: string[] = ['title'];
  @Index()
  @Column({ length: 500, type: ENUM_COLUMN_TYPES.VARCHAR, nullable: true })
  title?: string;

  @Column({ type: ENUM_COLUMN_TYPES.TEXT, nullable: true })
  description?: string;

  @Column({
    type: ENUM_COLUMN_TYPES.VARCHAR,
    nullable: false,
    unique: true,
  })
  slug: string;

  @Column({ nullable: true, default: 0, type: ENUM_COLUMN_TYPES.INT })
  orderPriority?: number;
}
