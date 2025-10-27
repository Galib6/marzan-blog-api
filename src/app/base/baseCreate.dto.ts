import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class BaseCreateDTO {
  @ApiProperty({
    type: Boolean,
    required: false,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  readonly isActive: boolean = true;

  @IsOptional()
  @IsUUID()
  readonly createdById!: string;
}
