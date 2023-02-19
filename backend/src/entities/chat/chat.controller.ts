import { Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from '@prisma/client';
import { Body } from '@nestjs/common/decorators';

@Controller('chat')
export class CatsController {
  constructor(private chatService: ChatService) {}

  @Post('/create')
  async createChat(@Body() chatData: Chat): Promise<Chat> {
    const chat = await this.chatService.createChat(chatData);
    return chat;
  }
}
