import { BaseEntity } from "@src/app/base";
import { ENUM_COLUMN_TYPES, ENUM_TABLE_NAMES } from "@src/shared";
import { Column, Entity, Index } from "typeorm";

@Entity(ENUM_TABLE_NAMES.AUTHORS)
export class Author extends BaseEntity {
  public static readonly SEARCH_TERMS: string[] = ["title"];

  @Index()
  @Column({ length: 256, type: ENUM_COLUMN_TYPES.VARCHAR, nullable: false })
  name: string;

  @Column({ length: 256, type: ENUM_COLUMN_TYPES.VARCHAR, nullable: false })
  type: string;

  @Column({ length: 256, type: ENUM_COLUMN_TYPES.VARCHAR, nullable: true })
  fb?: string;

  @Column({ length: 256, type: ENUM_COLUMN_TYPES.VARCHAR, nullable: true })
  whatsapp?: string;

  @Column({ length: 256, type: ENUM_COLUMN_TYPES.VARCHAR, nullable: true })
  linkedin?: string;

  @Column({ length: 256, type: ENUM_COLUMN_TYPES.VARCHAR, nullable: true })
  youtube?: string;

  @Column({ type: ENUM_COLUMN_TYPES.TEXT, nullable: true })
  description?: string;
}
