import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class PostCourseResponseDto {
  @IsString()
  @IsNotEmpty()
  courseId: string;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;
}
