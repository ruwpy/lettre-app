import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateMessageDto } from '../../dto/create-message.dto';
import { Message } from '@prisma/client';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  clientToUser = {};

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;

    return Object.values(this.clientToUser);
  }

  getClientName(cliendId: string) {
    return this.clientToUser[cliendId];
  }

  async createMessage(data: Message): Promise<Message> {
    return this.prisma.message.create({
      data: {
        from: {
          connect: {
            id: data.fromId,
          },
        },
        text: data.text,
        toId: data.toId,
      },
    });
  }

  // findAll() {
  //   return this.messages;
  // }

  joinRoom(id: number) {
    return 'This action allows to join a chat room';
  }

  async typing(id: number) {
    return 'This action shows either user typing or not';
  }

  getHello() {
    return 'Hello';
  }
}
