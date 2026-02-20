import { ApiProperty } from '@nestjs/swagger';
import { BaseCreateDTO } from '@src/app/base';
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTopicDTO extends BaseCreateDTO {
  @ApiProperty({
    description: 'The title of the topic',
    maxLength: 500,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  title?: string;

  @ApiProperty({
    description: 'The description of the topic',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'The slug of the topic',
    maxLength: 256,
    uniqueItems: true,
  })
  @IsString()
  @IsOptional()
  @MaxLength(256)
  slug: string;

  @ApiProperty({
    description: 'The order priority of the topic',
    required: false,
    default: 0,
  })
  @IsInt()
  @IsOptional()
  orderPriority?: number;
}
