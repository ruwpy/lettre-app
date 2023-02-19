import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CatsController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  controllers: [CatsController],
  providers: [ChatService, PrismaService],
})
export class ChatModule {}
