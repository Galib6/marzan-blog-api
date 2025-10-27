import { ApiProperty } from '@nestjs/swagger';
import { BaseCreateDTO } from '@src/app/base';
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDTO extends BaseCreateDTO {
  @ApiProperty({
    description: 'The title of the category',
    maxLength: 500,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  title?: string;

  @ApiProperty({
    description: 'The description of the category',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'The slug of the category',
    maxLength: 256,
    uniqueItems: true,
  })
  @IsString()
  @MaxLength(256)
  slug: string;

  @ApiProperty({
    description: 'The order priority of the category',
    required: false,
    default: 0,
  })
  @IsInt()
  @IsOptional()
  orderPriority?: number;
}
