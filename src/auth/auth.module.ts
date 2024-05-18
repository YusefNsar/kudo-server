import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { KudosModule } from '../kudos/kudos.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    KudosModule,
    PassportModule,
    EmailModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('auth.jwtConstants.secret'),
      }),
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService, JwtStrategy],
  exports: [LoginService],
})
export class AuthModule {}
