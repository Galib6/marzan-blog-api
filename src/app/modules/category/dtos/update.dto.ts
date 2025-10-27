import { OmitType, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { CreateCategoryDTO } from './create.dto';

export class UpdateCategoryDTO extends PartialType(OmitType(CreateCategoryDTO, ['createdBy'])) {
  @IsOptional()
  @IsNumber()
  readonly updatedBy!: any;
}
