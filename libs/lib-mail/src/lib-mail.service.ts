import { Inject, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as nunjucks from 'nunjucks';

@Injectable()
export class LibMailService {
  constructor(
    @Inject('MAIL_TRANSPORTER')
    private readonly transporter: nodemailer.Transporter,
    @Inject('VIEW_ENGINE')
    private readonly nunjucksEnv: nunjucks.Environment,
  ) { }

  async sendMailFromTemplate(
    to: string,
    subject: string,
    template: string,
    context: Record<string, any>,
  ) {
    // 🔹 Compile le template Nunjucks en HTML
    const html = this.nunjucksEnv.render(template, context);

    return await this.transporter.sendMail({
      from: `"Whatsap Delivery" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
    });
  }
}
