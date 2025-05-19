import { IsArray, IsNotEmpty } from 'class-validator';
import { GetCoursePreviewDto } from './getCoursePreview.dto';

export class GetEmployeeCoursesDto {
  @IsArray()
  @IsNotEmpty()
  courses: GetCoursePreviewDto[];
}
