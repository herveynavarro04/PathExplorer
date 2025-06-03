import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  @IsOptional()
  status?: boolean;

  @IsBoolean()
  @IsNotEmpty()
  mandatory: boolean;
}
