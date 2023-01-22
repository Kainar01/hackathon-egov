import type { BaseEntity } from '@/common/entities/base.entity';

import type { RoleType } from '../enums/role.enum';
import type { USER_PICTURE_THUMBNAILS } from '../user.constant';

export type UserPictureSizeAll = typeof USER_PICTURE_THUMBNAILS;

export type UserPictureSize = UserPictureSizeAll[number];

export type UserPictureThumbnails = Record<UserPictureSize, string>;

export interface UserPicture {
  original: string;
  thumbnails: UserPictureThumbnails;
}

export interface User extends BaseEntity {
  userId: number;
  email: string;
  password: string;
  phone: string;
  iin: string | null;
  role: RoleType | null;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  birthDate: Date | null;
  balance: number;
  cityId: number | null;
  picture: UserPicture | null;
  isVerified: boolean;
}
