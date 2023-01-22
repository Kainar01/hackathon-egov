import { ApiProperty } from '@nestjs/swagger';
import type { RoleType } from '../enums/role.enum';
import type { UserPicture } from '../interfaces/user.interface';

export class UserResponseDto {
  @ApiProperty()
  userId!: number;

  @ApiProperty()
  role!: RoleType | null;

  @ApiProperty()
  iin!: string | null;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  phone!: string;

  @ApiProperty()
  firstName!: string | null;

  @ApiProperty()
  lastName!: string | null;

  @ApiProperty()
  cityId!: number | null;

  @ApiProperty({ type: 'object' })
  picture!: UserPicture | null;

  @ApiProperty()
  birthDate!: Date | null;
}
