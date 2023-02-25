import { Controller, Get, Param } from '@nestjs/common/decorators';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('/:query')
  async getUsers(@Param() { query }: { query: string }) {
    const users = await this.userService.getUsers(query);
    return users;
  }
}
