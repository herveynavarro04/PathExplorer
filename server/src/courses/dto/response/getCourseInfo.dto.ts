import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class GetCourseInfoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  duration: string;

  @IsString()
  @IsNotEmpty()
  information: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsBoolean()
  @IsNotEmpty()
  mandatory: boolean;
}
