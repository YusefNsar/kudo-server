import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from './auth.type';
import { EmployeeService } from '../kudos/services/employee.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly emailService: EmailService,
    private jwtService: JwtService,
    private employeeService: EmployeeService,
  ) {}

  async sendOTP(email: string) {
    const otp = this.generateOtp();
    await this.employeeService.saveOtp(email, otp);

    await this.emailService.sendOtpEmail(email, otp);

    return { message: 'OTP sent successfully' };
  }

  async verifyOTP(email: string, otp: string) {
    // todo: get otp from employee service
    if (otp !== '123456') {
      throw new HttpException(
        'OTP verification failed',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload: AuthPayload = {
      // todo: from employee service
      email: 'yusef@email.com',
      isAdmin: false,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async getUserFromToken(token: string) {
    try {
      const decodedToken = this.jwtService.verify(token);
      // Here you can fetch user data from decodedToken and return it
      return decodedToken;
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }

  async adminLogin(username: string, password: string) {
    // For demo purpose, let's assume admin credentials are stored in environment variables
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (username === adminUsername && password === adminPassword) {
      // If credentials match, generate and return token
      const token = jwt.sign({ username }, 'admin_secret_key', {
        expiresIn: '1h',
      });
      return { token };
    } else {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  private generateOtp() {
    const OTP_SIZE = 6;
    return randomBytes(OTP_SIZE / 2)
      .toString('hex')
      .toUpperCase();
  }
}
