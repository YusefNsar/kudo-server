import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
    console.log(otp);
    await this.employeeService.saveOtp(email, otp);

    await this.emailService.sendOtpEmail(email, otp);

    return { message: 'OTP sent successfully' };
  }

  async verifyOTP(email: string, otp: string) {
    const employee = await this.employeeService.getEmployeeByEmail(email);

    if (!employee || otp !== employee.lastOtp) {
      throw new HttpException(
        'OTP verification failed',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload: AuthPayload = {
      employee: employee,
      isAdmin: false,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async getUserFromToken(token: string) {
    try {
      const decodedToken = this.jwtService.verify(token);

      return decodedToken;
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }

  async adminLogin(username: string, password: string) {
    // For demo purpose, let's assume admin credentials are stored in environment variables
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (username !== adminUsername || password !== adminPassword) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload: AuthPayload = { username, isAdmin: true };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private generateOtp() {
    const OTP_SIZE = 6;
    return randomBytes(OTP_SIZE / 2)
      .toString('hex')
      .toUpperCase();
  }
}
