import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDto } from './dto/request/signIn.request';
import { SignInResponseDto } from './dto/response/signIn.response.dto';
import { RegisterRequestDto } from './dto/request/register.request.dto';
import { RegisterResponseDto } from './dto/response/register.response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() userPayload: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    return this.authService.registerUser(userPayload);
  }

  @Post('signIn')
  async signIn(
    @Body() userPayload: SignInRequestDto,
  ): Promise<SignInResponseDto> {
    return this.authService.signIn(userPayload);
  }
}
