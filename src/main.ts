import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import config from './config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      maxParamLength: 250,
    }),
    {
      // cors: {
      //   origin: JSON.parse(process.env.CORS_URLS),
      //   credentials: true,
      // },
      // logger: new CustomLogger(),
    },
  );

  app.setGlobalPrefix('/api/v1/', {
    exclude: ['_health'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.enableShutdownHooks();

  await app.listen(config().port);
}
bootstrap();
