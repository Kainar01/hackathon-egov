import { ApiProperty } from '@nestjs/swagger';

export class ConfirmAuthVerificationResponseDto {
  @ApiProperty()
  isVerified!: boolean;
}
