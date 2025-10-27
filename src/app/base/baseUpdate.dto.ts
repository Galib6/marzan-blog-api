import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class BaseUpdateDTO {
  @ApiProperty({
    type: Boolean,
    required: false,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;

  @IsOptional()
  @IsUUID()
  readonly updatedById?: string;
}
