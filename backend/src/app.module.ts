import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MessagesModule } from './entities/message/messages.module';
import { ContactModule } from './entities/contact/contact.module';
import { UserModule } from './entities/user/user.module';
import { ConversationModule } from './entities/conversation/conversation.module';
import { VerifyJwtMiddleware } from './middleware/verifyJwt.middleware';

@Module({
  imports: [MessagesModule, ContactModule, ConversationModule, UserModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyJwtMiddleware)
      .forRoutes('contacts', 'conversation', 'user');
  }
}
