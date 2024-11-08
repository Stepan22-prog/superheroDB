import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, '..', 'uploads'));

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000, { infer: true });
  const clientUrl = configService.get<string>(
    'CLIENT_URL',
    'http://localhost:5173',
    { infer: true },
  );

  app.enableCors({
    origin: [clientUrl],
  });
  await app.listen(port);
}
bootstrap();
