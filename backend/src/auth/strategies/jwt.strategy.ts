import { ExtractJwt, Strategy } from 'passport-jwt';

import { PassportStrategy } from '@nestjs/passport';

import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { UsersService } from '../../users/users.service';

import { User } from '../../users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      ignoreExpiration: false,

      secretOrKey: configService.get<string>('JWT_SECRET') || 'f828730b354386097b9f2e7c41c02cbfe9696f61a2e50a2c52f1658c157c9a51810bc7e1ddc8cc2e2d5911354244bec8e7877e27efa8a9b03826fd0b35e6add77dd9679f517cc95feda6ad4d28291a548435838572367e7775c639f117bee30f47d84f4d1fc71e1711a247f57fb9ceb749986dbeefc2ec8dec449207f3acc658',
    });
  }

  async validate(payload: { sub: string; email: string }): Promise<User> {
    const user = await this.usersService.findOne(payload.sub);

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid or inactive user');
    }

    return user; 
  }
}
