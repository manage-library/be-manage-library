import {
  Controller,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { getAuth } from 'firebase-admin/auth';

import { AuthService } from './auth.service';
import {
  ForgotPasswordDto,
  LoginRequestDto,
  RegisterRequestDto,
  VerifyForgotPasswordDto,
} from './dtos/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  @Post('verify-token')
  async verify(@Body() body) {
    const { idToken }: { idToken: string } = body;

    getAuth()
      .verifyIdToken(
        'eyJhbGciOiJSUzI1NiIsImtpZCI6ImFkMWIxOWYwZjU4ZTJjOWE5Njc3M2M5MmNmODA0NDEwMTc5NzEzMjMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbHltZS1mZGIyNiIsImF1ZCI6Imx5bWUtZmRiMjYiLCJhdXRoX3RpbWUiOjE2NjA1NTk2MjcsInVzZXJfaWQiOiJnVWduaFZiU1hzUVp5SW9HRE5ia05ydFhKMXQyIiwic3ViIjoiZ1VnbmhWYlNYc1FaeUlvR0ROYmtOcnRYSjF0MiIsImlhdCI6MTY2MDU1OTcwNSwiZXhwIjoxNjYwNTYzMzA1LCJwaG9uZV9udW1iZXIiOiIrODQ5NjU4NjYzNzQiLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7InBob25lIjpbIis4NDk2NTg2NjM3NCJdfSwic2lnbl9pbl9wcm92aWRlciI6InBob25lIn19.D0EaQXv4vSeIPc9Matm_3ocnhbA4qYc7XXoTQkfweX0EDIfi0vWfpI0LntGJw-KC_bdZ2DoVOJyFHHioWEmXiqb7BDclKmRj4aJkl3pblf0i_q_Av9-Mk3yRqCsppmVJprUmg4HRc0mAEG7Ns_RqPhc2bF1zlXFMiL-hXyte8fdP1mSZtbJlc7h042eoQ6FcAxrk4m_NOcXR5kJjW8UkIZ40sRViq50ty8OOeUhSYp5uW8r14tGXetwnOljQSh4GBNF9DjtRRkuoW7FbAxBLIsYaOdMr8wJTR3kB2dh-LGTtYQgtfDbdKXCW2oyLH7jSJBNop6_hLFTtWvScVgU-8g',
      )
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        console.log(decodedToken);
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  }
}
