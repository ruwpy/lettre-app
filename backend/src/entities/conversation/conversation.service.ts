import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { Conversation } from '@prisma/client';
import { UserSub } from '../contact/contact.controller';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}
  async getConversation(conversationId: string, user: UserSub) {
    const conversation = await this.prisma.conversation.findFirst({
      where: { id: conversationId },
      include: { messages: { orderBy: { created_at: 'asc' } } },
    });

    if (!conversation) throw new NotFoundException();
    if (!this.isMyConversation(user.sub, conversation))
      throw new UnauthorizedException();

    return conversation;
  }

  isMyConversation(userId: string, conversation: Conversation) {
    return conversation.participants.includes(userId);
  }
}
