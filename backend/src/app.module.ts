import { Module } from '@nestjs/common';
import { MessagesModule } from './entities/message/messages.module';
import { ChatModule } from './entities/chat/chat.module';

@Module({
  imports: [MessagesModule, ChatModule],
})
export class AppModule {}
