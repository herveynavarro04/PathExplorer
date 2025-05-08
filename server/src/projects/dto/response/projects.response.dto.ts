import { IsArray, IsNotEmpty } from 'class-validator';
import { ProjectInfoPreviewResponseDto } from './projectInfoPreview.response.dto';

export class ProjectsResponseDto {
  @IsArray()
  @IsNotEmpty()
  availableProjects: ProjectInfoPreviewResponseDto[];
}
