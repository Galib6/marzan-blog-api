import { ApiProperty } from '@nestjs/swagger';
import { BaseCreateDTO } from '@src/app/base';
import { IsInt, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateBannerDTO extends BaseCreateDTO {
  @ApiProperty({
    type: String,
    example: 'a8f18971-4046-4e7a-bfc8-c5d1a6f9107b',
  })
  @IsUUID()
  @IsNotEmpty()
  articleId: string;

  @ApiProperty({
    description: 'The order priority of the Banner',
    required: false,
    default: 0,
  })
  @IsInt()
  @IsOptional()
  orderPriority?: number;
}
