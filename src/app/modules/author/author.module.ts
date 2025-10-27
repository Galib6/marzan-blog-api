import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category/category.module';
import { InternalAuthorController } from './controllers/internal/author.internal.controller';
import { Author } from './entities/author.entity';
import { AuthorService } from './services/author.service';

const entities = [Author];
const services = [AuthorService];
const subscribers = [];
const controllers = [];
const webControllers = [];
const internalControllers = [InternalAuthorController];
const modules = [CategoryModule];

@Module({
  imports: [TypeOrmModule.forFeature(entities), ...modules],
  providers: [...services, ...subscribers],
  exports: [...services, ...subscribers],
  controllers: [...controllers, ...webControllers, ...internalControllers],
})
export class AuthorModule {}
