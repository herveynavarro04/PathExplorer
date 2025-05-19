import {IsNotEmpty, IsString } from 'class-validator';

export class GetCoursePreviewDto {
  @IsString()
  @IsNotEmpty()
  courseId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  information: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
