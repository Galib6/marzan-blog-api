import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../article/entities/article.entity';
import { InternalCategoryController } from './controllers/internal/category.internal.controller';
import { WebCategoryController } from './controllers/web/category.web.controller';
import { Category } from './entities/category.entity';
import { CategoryService } from './services/category.service';

const entities = [Category, Article];
const services = [CategoryService];
const subscribers = [];
const controllers = [];
const webControllers = [WebCategoryController];
const internalControllers = [InternalCategoryController];
const modules = [];

@Module({
  imports: [TypeOrmModule.forFeature(entities), ...modules],
  providers: [...services, ...subscribers],
  exports: [...services, ...subscribers],
  controllers: [...controllers, ...webControllers, ...internalControllers],
})
export class CategoryModule {}
