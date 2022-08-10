import {
  Controller,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import {
  ForgotPasswordDto,
  LoginRequestDto,
  RegisterRequestDto,
  VerifyForgotPasswordDto,
} from './dtos/auth.dto';
import { firebase } from 'src/common/helpers/firebase';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private provider;

  constructor(private readonly authService: AuthService) {
    this.provider = new firebase.auth.PhoneAuthProvider();
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  login(@Body() body: LoginRequestDto) {
    return this.authService.login(body);
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  register(@Body() body: RegisterRequestDto) {
    return this.authService.register(body);
  }

  @Post('forgot-password')
  forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body);
  }

  @Post('verify-forgot-password')
  verifyForgotPassword(@Body() body: VerifyForgotPasswordDto) {
    return this.authService.verifyForgotPassword(body);
  }

  @Get()
  getToken() {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaGVsbG8iLCJlbWFpbCI6ImpvbkBnbWFpbC5jb20iLCJleHRlcm5hbF9pZCI6ImhhaGFoaGFoYWhhIiwiaWF0IjoxNjU3NzEwMDE3LCJleHAiOjE2NTc3MTA2MTd9.GQRmVQzFdJUcumPx9YqrU1YphESO09Gf3q012-NfAsc';
  }

  @Post('/send-otp')
  async send(@Body() body) {
    const { phoneNumber }: { phoneNumber: string } = body;

    const verify = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
    });

    const verificationId = await this.provider.verifyPhoneNumber(
      phoneNumber,
      verify,
    );

    return verificationId;
  }

  @Post('verify-otp')
  async verify(@Body() body) {
    const { otp, verificationId }: { otp: string; verificationId } = body;

    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      otp,
    );

    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => console.log(result))
      .catch((e) => console.log(e));
  }
}
