import { Injectable } from '@nestjs/common/decorators';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers(query) {
    const users = await this.prisma.user.findMany({
      where: { name: { contains: query, mode: 'insensitive' } },
    });

    return users;
  }
}
