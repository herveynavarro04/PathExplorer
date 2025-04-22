import { IsNotEmpty, IsString } from 'class-validator';

export class SignInResponseDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
