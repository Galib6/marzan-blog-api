import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional } from 'class-validator';
import { Article } from '../../article/entities/article.entity';

export class CreateBannerDTO {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  article: Article;

  @ApiProperty({
    description: 'The order priority of the Banner',
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
