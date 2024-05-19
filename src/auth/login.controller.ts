import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { SendOtpDto } from './dto/send-otp.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('send-otp')
  async sendOTP(@Body() body: SendOtpDto) {
    return await this.loginService.sendOTP(body.email);
  }

  @Post('verify')
  async verifyOTP(@Body('email') email: string, @Body('otp') otp: string) {
    return await this.loginService.verifyOTP(email, otp);
  }

  @Post('token')
  async getToken(@Body('token') token: string) {
    return await this.loginService.getUserFromToken(token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('admin')
  async adminLogin(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return await this.loginService.adminLogin(username, password);
  }
}
