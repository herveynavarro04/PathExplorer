import { IsArray, IsNotEmpty } from 'class-validator';
import { ProjectInfoPreviewResponseDto } from './projectInfoPreview.response.dto';

export class GetEmployeeProjectsResponseDto {
  @IsArray()
  @IsNotEmpty()
  employeeProjects: ProjectInfoPreviewResponseDto[];
}
