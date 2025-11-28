import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

export const mailerConfig = async (configService: ConfigService) => {
  return nodemailer.createTransport({
    host: configService.get<string>('MAIL_HOST'),
    port: 465,
    secure: true, // 465 = SSL
    auth: {
      user: configService.get<string>('MAIL_USER'),
      pass: configService.get<string>('MAIL_PASS'),
    },
  });
};
