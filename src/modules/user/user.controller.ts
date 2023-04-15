import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

import { ReqUser } from '@/common/decorators/req-user.decorator';

import { UserPayload } from '../auth/interface/auth.interface';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards()
  @Get('/me')
  public async me(@ReqUser() user: UserPayload): Promise<User> {
    return this.userService.findOne(user.userId);
  }
}
