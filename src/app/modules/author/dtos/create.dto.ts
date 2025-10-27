import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAuthorDTO {
  @ApiProperty({ description: 'The name of the author', maxLength: 256 })
  @IsString()
  @MaxLength(256)
  name: string;

  @ApiProperty({ description: 'The type of the author', maxLength: 256 })
  @IsString()
  @MaxLength(256)
  type: string;

  @ApiProperty({
    description: 'The Facebook profile of the author',
    maxLength: 256,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(256)
  fb?: string;

  @ApiProperty({
    description: 'The WhatsApp contact of the author',
    maxLength: 256,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(256)
  whatsapp?: string;

  @ApiProperty({
    description: 'The LinkedIn profile of the author',
    maxLength: 256,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(256)
  linkedin?: string;

  @ApiProperty({
    description: 'The YouTube channel of the author',
    maxLength: 256,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(256)
  youtube?: string;

  @ApiProperty({
    description: 'The description of the author',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsNumber()
  readonly createdBy!: any;
}
