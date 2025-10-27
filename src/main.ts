import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'body-parser';
import { join } from 'path';
import { AppModule } from './app/app.module';
import { ENV } from './env';
import { createLogger } from './logger';
import { setupSecurity } from './security';
import { setupSwagger } from './swagger';

const logger = new Logger('main.ts');
//test

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ENV.config.isDevelopment
      ? createLogger()
      : ['error', 'warn', 'debug', 'log', 'verbose'],
  });

  app.setBaseViewsDir(join(process.cwd(), 'views'));
  app.setViewEngine('hbs');

  app.use(urlencoded({ extended: true }));
  app.use(json({ limit: '10mb' }));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.setGlobalPrefix(ENV.swagger.apiPrefix);

  setupSecurity(app);
  setupSwagger(app);

  await app.listen(ENV.config.port);
  const appUrl = await app.getUrl();

  logger.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀  App running on: ${appUrl}
📘  Docs: ${appUrl}/docs
🌟  Welcome to ✨ MΛRZΛN BŁØG ✨
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
}
bootstrap();
