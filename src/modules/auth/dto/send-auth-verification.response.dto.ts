import { ApiProperty } from '@nestjs/swagger';

export class SendAuthVerificationResponseDto {
  @ApiProperty()
  verificationId!: string;

  @ApiProperty()
  isVerified!: boolean;
}
