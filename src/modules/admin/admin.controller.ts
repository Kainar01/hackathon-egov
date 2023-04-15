import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '@prisma/client';

import { AdminService } from './admin.service';
import { CreateOperatorDto } from './dto/create-operator.dto';

@Controller('/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/operators')
  public async createOperator(@Body() data: CreateOperatorDto): Promise<User> {
    return this.adminService.createOperator(data);
  }

  @Get('/operators')
  public async findOperators(): Promise<User[]> {
    return this.adminService.findOperators();
  }
}
