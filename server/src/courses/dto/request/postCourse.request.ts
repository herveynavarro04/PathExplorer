import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class PostCourseRequestDto {
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
  url: string;

  @IsBoolean()
  @IsNotEmpty()
  mandatory: boolean;

  @IsArray()
  @IsNotEmpty()
  employeesAssigned: string[];
}
