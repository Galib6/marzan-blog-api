import { IntersectionType } from '@nestjs/swagger';
import { BaseUpdateDTO } from '@src/app/base';
import { CreateAuthorDTO } from './create.dto';

export class UpdateAuthorDTO extends IntersectionType(BaseUpdateDTO, CreateAuthorDTO) {}
