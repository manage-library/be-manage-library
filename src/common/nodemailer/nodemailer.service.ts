import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NodemailerService {
  private oAuth2Client;

  constructor(private readonly configService: ConfigService) {
    this.oAuth2Client = new OAuth2Client(
      this.configService.get('CLIENT_ID'),
      this.configService.get('CLIENT_SECRET'),
      this.configService.get('REDIRECT_URL'),
    );

    this.oAuth2Client.setCredentials({
      refresh_token: this.configService.get('REFRESH_TOKEN'),
    });
  }

  async sendMail({ receiverEmail, code }) {
    try {
      const accessToken = await this.oAuth2Client.getAccessToken();

      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: this.configService.get('SENDER_EMAIL'),
          clientId: this.configService.get('CLIENT_ID'),
          clientSecret: this.configService.get('CLIENT_SECRET'),
          refreshToken: this.configService.get('REFRESH_TOKEN'),
          accessToken: accessToken?.token,
        },
      });

      const mailOptions = {
        from: this.configService.get('SENDER_EMAIL'),
        to: receiverEmail,
        subject: 'Gmail API NodeJS',
        text: `Forgot password code: ${code}`,
      };

      const result = await transport.sendMail(mailOptions);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }
}
