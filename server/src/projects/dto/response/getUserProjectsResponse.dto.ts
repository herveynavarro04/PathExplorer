import { IsArray, IsNotEmpty } from 'class-validator';
import { ProjectInfoPreviewResponseDto } from './projectInfoPreview.response.dto';

export class GetUserProjectsResponseDto {
  @IsArray()
  @IsNotEmpty()
  availableProjects: ProjectInfoPreviewResponseDto[];
}
