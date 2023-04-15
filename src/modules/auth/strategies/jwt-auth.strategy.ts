import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

import { ServerConfig } from '@/config/server.config';

import { JwtPayload, UserPayload } from '../interface/auth.interface';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt-auth') {
  constructor() {
    super({
      ignoreExpiration: false,
      secretOrKey: ServerConfig.JWT_ACCESS_SECRET,
      jwtFromRequest: (req: Request): any => {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
          return authHeader.split(' ')[1];
        }
        if (req.cookies?.access_token) {
          return req.cookies.access_token;
        }
        throw new UnauthorizedException();
      },
    });
  }

  public validate({ sub, ...payload }: JwtPayload): UserPayload {
    if (payload === null) {
      throw new UnauthorizedException();
    }
    return {
      userId: sub,
      ...payload,
    };
  }
}
