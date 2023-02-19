import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Chat } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createChat(data: Chat): Promise<Chat> {
    const chat = await this.prisma.chat.findFirst({
      where: {
        from_id: data.from_id,
        to_id: data.to_id,
      },
    });

    if (chat) return chat;

    return this.prisma.chat.create({
      data: {
        from: {
          connect: {
            id: data.from_id,
          },
        },
        to_id: data.to_id,
      },
    });
  }
}
