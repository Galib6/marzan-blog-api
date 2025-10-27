import { IntersectionType, PartialType } from '@nestjs/swagger';
import { BaseUpdateDTO } from '@src/app/base';
import { CreateArticleDTO } from './create.dto';

export class UpdateArticleDTO extends IntersectionType(
  PartialType(CreateArticleDTO),
  BaseUpdateDTO
) {}
