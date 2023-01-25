import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ServerConfig } from '@/config/server.config';

import type { JwtPayload, JwtSign, UserPayload } from '../auth.interface';

@Injectable()
export class JwtVerifyStrategy extends PassportStrategy(Strategy, 'jwt-verify') {
  constructor() {
    super({
      ignoreExpiration: true,
      secretOrKey: ServerConfig.JWT_ACCESS_SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request): string | null => {
          const data = (<Partial<JwtSign>>request.cookies)?.access_token;
          if (!data) {
            return null;
          }
          return data;
        },
      ]),
    });
  }

  public validate(payload: JwtPayload | null): UserPayload {
    if (payload === null) {
      throw new UnauthorizedException();
    }
    return { userId: payload.sub, role: payload.role, depotStaffId: payload.depotStaffId };
  }
}
