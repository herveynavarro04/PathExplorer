import { IsArray, IsNotEmpty } from 'class-validator';
import { ProjectInfoPreviewResponseDto } from './projectInfoPreview.response.dto';

export class GetAvailableResponseDto {
  @IsArray()
  @IsNotEmpty()
  availableProjects: ProjectInfoPreviewResponseDto[];
}
