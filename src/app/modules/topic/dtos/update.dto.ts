import { IntersectionType } from '@nestjs/swagger';
import { BaseUpdateDTO } from '@src/app/base';
import { CreateTopicDTO } from './create.dto';

export class UpdateTopicDTO extends IntersectionType(CreateTopicDTO, BaseUpdateDTO) {}
