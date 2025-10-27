import { IntersectionType } from '@nestjs/swagger';
import { BaseUpdateDTO } from '@src/app/base';
import { IsNumber, IsOptional } from 'class-validator';
import { CreateBannerDTO } from './create.dto';

export class UpdateBannerDTO extends IntersectionType(BaseUpdateDTO, CreateBannerDTO) {
  @IsOptional()
  @IsNumber()
  readonly updatedBy!: any;
}
