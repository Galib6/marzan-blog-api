import { ApiProperty } from '@nestjs/swagger';
import { BaseFilterDTO } from '@src/app/base/baseFilter.dto';
import { IsOptional, IsUUID } from 'class-validator';

export class FilterArticleDTO extends BaseFilterDTO {
  @ApiProperty({ required: false, description: 'Filter by category ID' })
  @IsOptional()
  @IsUUID()
  readonly categoryId?: string;

  @ApiProperty({ required: false, description: 'Filter by topic ID' })
  @IsOptional()
  @IsUUID()
  readonly topicId?: string;
}
