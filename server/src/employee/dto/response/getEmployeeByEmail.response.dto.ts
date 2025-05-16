import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class FindEmployeebyEmailResponseDto {
  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  imgUrl: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}
