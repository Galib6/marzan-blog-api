import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { RateLimitModule } from '@src/app/modules/throttler/rateLimit.module';
import { DatabaseModule } from '@src/database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExceptionFilter } from './filters';
import { GuardsModule } from './guards/gaurds.module';
import { HelpersModule } from './helpers/helpers.module';
import { ActiveUserInserter } from './interceptors/activeUserInserter.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { GalleryModule } from './modules/galleries/gallery.module';
import { RedisModule } from './modules/redis/redis.module';

const MODULES = [
  DatabaseModule,
  HelpersModule,
  AuthModule,
  GalleryModule,
  RedisModule,
  // KafkaModule,
];
@Module({
  imports: [...MODULES, GuardsModule, RateLimitModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
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
