import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv'; // Load .env file before accessing process.env

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     groups: ['create'],
  //     always: true,
  //   }),
  // );
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
