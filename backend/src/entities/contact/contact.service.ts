import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  Contact as ContactModel,
  User as UserModel,
  Conversation as ConversationModel,
} from '@prisma/client';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { UserSub } from './contact.controller';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async createContact(
    relatedUserId: string,
    user: UserSub,
  ): Promise<ContactModel> {
    const myId = user.sub;

    const relatedUser = await this.prisma.user.findFirst({
      where: {
        id: relatedUserId,
      },
    });

    if (!relatedUser) throw new NotFoundException('User not found');
    if (relatedUser.id === myId)
      throw new BadRequestException('Cannot add yourself as a contact');

    const isContactExists = await this.prisma.contact.findFirst({
      where: {
        user_id: myId,
        contact_id: relatedUser.id,
      },
    });
    if (isContactExists)
      throw new BadRequestException('Contact already exists');

    const foundConversation = await this.prisma.conversation.findFirst({
      where: { participants: { hasEvery: [myId, relatedUser.id] } },
    });

    if (foundConversation) {
      const contact = await this.newContact({
        myId,
        relatedUser,
        conversation: foundConversation,
      });
      return contact;
    }

    const conversation = await this.newConversation([myId, relatedUser.id]);
    const contact = await this.newContact({
      myId,
      relatedUser,
      conversation,
    });

    return contact;
  }

  async getContacts(user: UserSub) {
    const contacts = await this.prisma.contact.findMany({
      where: {
        user_id: user.sub,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return contacts;
  }

  async newConversation(idArray: string[]) {
    return await this.prisma.conversation.create({
      data: {
        participants: idArray,
      },
    });
  }

  async newContact({
    myId,
    relatedUser,
    conversation,
  }: {
    myId: string;
    relatedUser: UserModel;
    conversation: ConversationModel;
  }) {
    return await this.prisma.contact.create({
      data: {
        user_id: myId,
        contact_id: relatedUser.id,
        conversation_id: conversation.id,
      },
    });
  }
}
