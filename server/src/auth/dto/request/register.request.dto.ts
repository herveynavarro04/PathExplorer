import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RegisterRequestDto {
  @IsString()
  @IsOptional()
  employeeId?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  password?: string;

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
