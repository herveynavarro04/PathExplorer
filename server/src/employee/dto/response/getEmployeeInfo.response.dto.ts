import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetEmployeeInfoResponseDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  profilePicture: Buffer | string;

  @IsString()
  @IsOptional()
  mimeType?: string;
}
