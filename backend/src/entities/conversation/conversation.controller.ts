import { Controller, Request, Get, Param } from '@nestjs/common/decorators';
import { UserSub } from '../contact/contact.controller';
import { ConversationService } from './conversation.service';

@Controller('conversation')
export class ConversationController {
  constructor(private conversationService: ConversationService) {}

  @Get('/:id')
  async getConversation(
    @Request() { user }: { user: UserSub },
    @Param() { id }: { id: string },
  ) {
    const conversation = await this.conversationService.getConversation(
      id,
      user,
    );
    return conversation;
  }
}
