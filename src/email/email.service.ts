import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  sendOtpEmail(email: string, otp: string) {
    return this.mailerService.sendMail({
      to: email,
      subject: 'Kudos Login OTP',
      template: 'otp',
      context: {
        otp: otp,
      },
    });
  }
}
