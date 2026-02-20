import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InternalTopicController } from './controllers/internal/topic.internal.controller';
import { WebTopicController } from './controllers/web/topic.web.controller';
import { Topic } from './entities/topic.entity';
import { TopicService } from './services/topic.service';

const entities = [Topic];
const services = [TopicService];
const subscribers = [];
const controllers = [];
const webControllers = [WebTopicController];
const internalControllers = [InternalTopicController];
const modules = [];

@Module({
  imports: [TypeOrmModule.forFeature(entities), ...modules],
  providers: [...services, ...subscribers],
  exports: [...services, ...subscribers],
  controllers: [...controllers, ...webControllers, ...internalControllers],
})
export class TopicModule {}
