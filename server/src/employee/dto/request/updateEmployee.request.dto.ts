import { IsOptional, IsString } from 'class-validator';

export class UpdateEmployeeRequestDto {
  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  imgUrl?: string;
}
