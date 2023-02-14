import { NestFactory } from '@nestjs/core';
import { MessagesModule } from './entities/message/messages.module';

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);
  await app.listen(3002);

  console.log('The server is running on http://localhost:3002');
}
bootstrap();
