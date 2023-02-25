import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Message as MessageModel } from '@prisma/client';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async createMessage(data: MessageModel): Promise<MessageModel> {
    return await this.prisma.message.create({
      data: {
        conversation: {
          connect: {
            id: data.conversation_id,
          },
        },
        text: data.text,
        sender_id: data.sender_id,
      },
    });
  }

  async typing(id: number) {
    return 'This action shows either user typing or not';
  }
}
