import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { WebSocketServer } from '@nestjs/websockets/decorators';
import { Server } from 'socket.io';
import { Message as MessageModel } from '@prisma/client';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  async create(
    @MessageBody() messageData: MessageModel,
  ): Promise<MessageModel> {
    const message = await this.messagesService.createMessage(messageData);
    this.server.emit('message', message);
    return message;
  }
}
