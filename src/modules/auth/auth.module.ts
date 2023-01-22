import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServerConfig } from '@/config/server.config';
import { UserEntity } from '@/modules/user/entities/user.entity';

import { VerificationModule } from '../verification/verification.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtVerifyStrategy, JwtStrategy } from './strategies';

@Module({
  imports: [
    VerificationModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: ServerConfig.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: `${ServerConfig.JWT_ACCESS_TTL_IN_MINUTES} minutes` },
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtVerifyStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
