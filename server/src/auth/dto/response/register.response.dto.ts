import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterResponseDto {
  @IsString()
  @IsNotEmpty()
  id_employee: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
