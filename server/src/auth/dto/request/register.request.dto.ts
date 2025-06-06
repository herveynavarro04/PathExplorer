import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  rol: string;

  @IsNumber()
  @IsNotEmpty()
  level: number;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}
