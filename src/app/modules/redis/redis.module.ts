import { Global, Module } from '@nestjs/common';
import { RedisService } from '@src/app/modules/redis/redis.service';

@Global()
@Module({
  imports: [],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
