import { IsOptional, IsString } from 'class-validator';

export class UserUpdateRequestDto {
  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  imgUrl?: string;
}
