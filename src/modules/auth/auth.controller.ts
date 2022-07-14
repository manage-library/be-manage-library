import {
  Controller,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

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
  @UsePipes(ValidationPipe)
  forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body);
  }

  @Post('verify-forgot-password')
  @UsePipes(ValidationPipe)
  verifyForgotPassword(@Body() body: VerifyForgotPasswordDto) {
    return this.authService.veriForgotPassword(body);
  }
}
