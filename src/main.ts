import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
console.log(
  process.env.DB_USER_NAME,
  process.env.DB_USER_PASSWORD,
  process.env.DB_NAME,
);

bootstrap();
