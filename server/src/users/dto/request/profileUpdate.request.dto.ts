import { IsOptional, IsString } from 'class-validator';

export class ProfileUpdateRequestDto {
  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  imgUrl?: string;
}
