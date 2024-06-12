import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthPayload } from '../auth.type';

@Injectable()
export class JwtEmployeeGuard extends AuthGuard('jwt') {
  handleRequest<u extends AuthPayload>(err, user: u) {
    if (err || !user || user.isAdmin) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
