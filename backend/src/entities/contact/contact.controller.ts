import { Controller, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { Contact as ContactModel } from '@prisma/client';
import { Body, Get, Request } from '@nestjs/common/decorators';
import { User } from '@supabase/supabase-js';

export interface UserSub extends User {
  sub: string;
}

@Controller('contacts')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post('/create')
  async createContact(
    @Body() { relatedUserId }: { relatedUserId: string },
    @Request() { user }: { user: UserSub },
  ): Promise<ContactModel> {
    const contact = await this.contactService.createContact(
      relatedUserId,
      user,
    );
    return contact;
  }

  @Get()
  async getContacts(@Request() { user }: { user: UserSub }) {
    const contacts = await this.contactService.getContacts(user);
    return contacts;
  }
}
