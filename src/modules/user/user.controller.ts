import {
  Body,
  Controller,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse } from '@nestjs/swagger';

import { UseAuth } from '@/common/decorators/auth.decorator';
import { ReqUser } from '@/common/decorators/req-user.decorator';
import type { UserPayload } from '@/modules/auth/auth.interface';

import { UpdateUserRequestDto } from './dto/update-user.request.dto';
import { UserResponseDto } from './dto/user.response.dto';
import type { UserPicture } from './interfaces/user.interface';
import { UserService } from './services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly user: UserService) {}

  @ApiResponse({ type: 'object' })
  @Get('check-email/:email')
  public async checkUsername(@Param() email: string): Promise<Record<'exists', boolean>> {
    return this.user.checkEmail(email);
  }

  @UseAuth()
  @ApiResponse({ type: UserResponseDto })
  @Get('profile')
  public async getProfile(@ReqUser() user: UserPayload): Promise<UserResponseDto> {
    return this.user.getProfile(user.userId);
  }

  @UseAuth()
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponse({ type: 'object' })
  @Post('images/uploadImage')
  public async saveProductImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 4 * 1024 * 1024 })],
      }),
    )
      file: Express.Multer.File,
      @ReqUser() user: UserPayload,
  ): Promise<UserPicture> {
    return this.user.uploadProfileImage(user.userId, file.buffer);
  }

  @UseAuth()
  @ApiResponse({ type: 'object' })
  @Put('')
  public async updateUser(@Body() dto: UpdateUserRequestDto, @ReqUser() user: UserPayload): Promise<void> {
    return this.user.updateUser(user.userId, dto);
  }
}
