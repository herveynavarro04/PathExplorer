import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterResponseDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
