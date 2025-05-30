import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateEmployeeCourseResponseDto {
  @IsString()
  @IsNotEmpty()
  courseId: string;

  @IsString()
  @IsNotEmpty()
  updatedAt: Date;
}
