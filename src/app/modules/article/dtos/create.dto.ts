import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from "class-validator";
import { Category } from "../../category/entities/category.entity";

export class ArticleCategoryCreateDTO {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  id: string;
}

export class CreateArticleDTO {
  @ApiProperty({
    description: "The title of the article",
    maxLength: 500,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  title?: string;

  @ApiProperty({
    description: "The categories of the article",
    type: [ArticleCategoryCreateDTO],
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ArticleCategoryCreateDTO)
  @IsOptional()
  categories?: Category[];

  @ApiProperty({ description: "The name of the article", maxLength: 256 })
  @IsString()
  @MaxLength(256)
  name: string;

  @ApiProperty({ description: "The summary of the article", maxLength: 256 })
  @IsString()
  @MaxLength(256)
  summary: string;

  @ApiProperty({
    description: "The thumbnail URL of the article",
    maxLength: 256,
  })
  @IsString()
  @MaxLength(256)
  thumb: string;

  @ApiProperty({ description: "The content of the article" })
  @IsOptional()
  content: any;

  @ApiProperty({
    description: "The slug of the article",
    maxLength: 256,
    uniqueItems: true,
  })
  @IsString()
  @MaxLength(256)
  slug: string;

  @ApiProperty({
    description: "The order priority of the article",
    required: false,
    default: 0,
  })
  @IsInt()
  @IsOptional()
  orderPriority?: number;

  @IsOptional()
  @IsNumber()
  readonly createdBy!: any;
}
