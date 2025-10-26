// bull-board/bull-board.module.ts
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ENV } from '@src/env';
import { Queue } from 'bullmq';
import * as express from 'express';
import { queueNames } from './constants';

@Module({})
export class BullBoardModule implements OnModuleInit {
  private logger = new Logger(BullBoardModule.name);
  onModuleInit(): void {
    const app = express();

    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath('/admin/queues');

    // Dynamically create BullMQ Queues
    const queues = Object.values(queueNames).map(
      (q) =>
        new BullMQAdapter(
          new Queue(q, {
            connection: {
              host: ENV.redis.host,
              port: ENV.redis.port,
              username: ENV.redis.username,
              password: ENV.redis.password,
              ...(!ENV.redis.host?.startsWith('localhost')
                ? { tls: { rejectUnauthorized: false } }
                : {}),
            },
          })
        )
    );

    createBullBoard({
      queues,
      serverAdapter,
    });

    app.use('/admin/queues', serverAdapter.getRouter());
    app.listen(3001, () => {
      this.logger.log('\n\n\n🚀🚀🚀 Bull Board available  http://localhost:3001/admin/queues\n');
    });
  }
}
