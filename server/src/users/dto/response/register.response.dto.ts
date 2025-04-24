import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterResponseDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
