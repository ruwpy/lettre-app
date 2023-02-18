import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Message } from '@prisma/client';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async createMessage(data: Message): Promise<Message> {
    return this.prisma.message.create({
      data: {
        from: {
          connect: {
            id: data.from_id,
          },
        },
        text: data.text,
        to_id: '1',
      },
    });
  }

  findAll() {
    return this.prisma.message.findMany();
  }

  async typing(id: number) {
    return 'This action shows either user typing or not';
  }
}
