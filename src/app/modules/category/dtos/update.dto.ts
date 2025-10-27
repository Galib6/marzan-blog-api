import { IntersectionType } from '@nestjs/swagger';
import { BaseUpdateDTO } from '@src/app/base';
import { CreateCategoryDTO } from './create.dto';

export class UpdateCategoryDTO extends IntersectionType(CreateCategoryDTO, BaseUpdateDTO) {}
