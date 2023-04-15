import { Controller, Get } from '@nestjs/common';
import { User } from '@prisma/client';

import { UserService } from './user.service';

@Controller('/user')
export class RequestController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  public async me(): Promise<User> {
    return this.userService.findOne(1);
  }
}
