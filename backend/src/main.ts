import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: 'https://lettre-app.vercel.app/',
  });
  await app.listen(3002);

  console.log('The server is running on http://localhost:3002');
}
bootstrap();
