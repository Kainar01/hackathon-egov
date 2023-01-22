import { ApiProperty } from '@nestjs/swagger';

export class ConfirmVerificationResponseDto {
  @ApiProperty()
  isVerified!: boolean;
}
