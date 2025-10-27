import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { RateLimitModule } from '@src/app/modules/throttler/rateLimit.module';
import { DatabaseModule } from '@src/database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogManagementController } from './controllers/log-management.controller';
import { ExceptionFilter } from './filters';
import { HelpersModule } from './helpers/helpers.module';
import { ActiveUserInserter } from './interceptors/activeUserInserter.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { AclModule } from './modules/acl/acl.module';
import { ArticleModule } from './modules/article/article.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthorModule } from './modules/author/author.module';
import { BannerModule } from './modules/banner/banner.module';
import { CategoryModule } from './modules/category/category.module';
import { GalleryModule } from './modules/galleries/gallery.module';
import { RedisModule } from './modules/redis/redis.module';
import { UserModule } from './modules/user/user.module';
import { LogCleanupService } from './services/log-cleanup.service';

const MODULES = [
  DatabaseModule,
  HelpersModule,
  AuthModule,
  GalleryModule,
  RedisModule,
  ArticleModule,
  CategoryModule,
  AuthorModule,
  UserModule,
  BannerModule,
  AclModule,
];
@Module({
  imports: [
    ...MODULES,
    // GuardsModule,
    RateLimitModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController, LogManagementController],
  providers: [
    AppService,
    LogCleanupService,
    { provide: APP_FILTER, useClass: ExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: ActiveUserInserter },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
  ],
})
export class AppModule {}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer): void {
//     consumer.apply(AuthMiddleware).forRoutes({ path: '/*path', method: RequestMethod.ALL });
//   }
// }
