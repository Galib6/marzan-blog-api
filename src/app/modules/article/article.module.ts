import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryModule } from "../category/category.module";
import { InternalArticleController } from "./controllers/internal/article.internal.controller";
import { Article } from "./entities/article.entity";
import { ArticleService } from "./services/article.service";

const entities = [Article];
const services = [ArticleService];
const subscribers = [];
const controllers = [];
const webControllers = [];
const internalControllers = [InternalArticleController];
const modules = [CategoryModule];

@Module({
  imports: [TypeOrmModule.forFeature(entities), ...modules],
  providers: [...services, ...subscribers],
  exports: [...services, ...subscribers],
  controllers: [...controllers, ...webControllers, ...internalControllers],
})
export class ArticleModule {}
