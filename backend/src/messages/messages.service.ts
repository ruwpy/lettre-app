import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  messages: Message[] = [{ id: 484846, name: 'ruwpy', text: 'hello' }];
  clientToUser = {};

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;

    return Object.values(this.clientToUser);
  }

  getClientName(cliendId: string) {
    return this.clientToUser[cliendId];
  }

  create(createMessageDto: CreateMessageDto) {
    const message = { ...createMessageDto };
    return this.messages.push(message);
  }

  findAll() {
    return this.messages;
  }

  joinRoom(id: number) {
    return 'This action allows to join a chat room';
  }

  async typing(id: number) {
    return 'This action shows either user typing or not';
  }
}
