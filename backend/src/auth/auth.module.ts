import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'f828730b354386097b9f2e7c41c02cbfe9696f61a2e50a2c52f1658c157c9a51810bc7e1ddc8cc2e2d5911354244bec8e7877e27efa8a9b03826fd0b35e6add77dd9679f517cc95feda6ad4d28291a548435838572367e7775c639f117bee30f47d84f4d1fc71e1711a247f57fb9ceb749986dbeefc2ec8dec449207f3acc658'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION', '1d'),
        },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}