import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ThumbnailService } from '@/common/providers/thumbnail.service';

import type { UpdateUserRequestDto } from '../dto/update-user.request.dto';
import type { UserResponseDto } from '../dto/user.response.dto';
import { UserEntity } from '../entities/user.entity';
import type { UserPicture, UserPictureSizeAll } from '../interfaces/user.interface';
import { USER_PICTURE_THUMBNAILS } from '../user.constant';

@Injectable()
export class UserService {
  private S3_PRODUCT_IMAGE_DIR: string = 'users';
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>, private readonly thumbnail: ThumbnailService) {}

  public async checkEmail(email: string): Promise<Record<'exists', boolean>> {
    const count = await this.userRepository.count({ where: { email } });
    return {
      exists: count !== 0,
    };
  }

  public async getProfile(userId: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { userId },
      select: ['userId', 'phone', 'iin', 'email', 'firstName', 'lastName', 'picture', 'role', 'cityId', 'birthDate'],
    });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return user;
  }

  public async updateUser(userId: number, dto: UpdateUserRequestDto): Promise<void> {
    await this.userRepository.update({ userId }, dto);
  }

  public async uploadProfileImage(userId: number, image: Buffer): Promise<UserPicture> {
    const dir = `${this.S3_PRODUCT_IMAGE_DIR}/${userId}`;
    return this.thumbnail.saveImageThumbnails<UserPictureSizeAll>(image, {
      dir,
      thumbnailSizes: USER_PICTURE_THUMBNAILS,
    });
  }
}
