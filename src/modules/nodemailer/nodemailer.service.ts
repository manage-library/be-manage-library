import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NodeMailerService {
  private oAuth2Client;

  constructor(private readonly configService: ConfigService) {
    this.oAuth2Client = new google.auth.OAuth2(
      this.configService.get('CLIENT_ID'),
      this.configService.get('CLIENT_SECRET'),
    );

    this.oAuth2Client.setCredentials({
      refresh_token: this.configService.get('REFRESH_TOKEN'),
    });
  }

  async sendMail({ email, code }) {
    const accessToken = await this.oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get('SENDER_EMAIL'),
        clientId: this.configService.get('CLIENT_ID'),
        clientSecret: this.configService.get('CLIENT_SECRET'),
        refreshToken: this.configService.get('REFRESH_TOKEN'),
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: this.configService.get('SENDER_EMAIL'),
      to: email,
      subject: 'Gmail API NodeJS',
      text: `Verify forgot password code: ${code}`,
    };

    await transport.sendMail(mailOptions);
  }
}
