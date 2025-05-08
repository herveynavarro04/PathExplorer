import { IsArray, IsOptional } from 'class-validator';
import { ProjectInfoPreviewResponseDto } from 'src/projects/dto/response/projectInfoPreview.response.dto';
export class GetUserProjectsResponseDto {
  @IsArray()
  @IsOptional()
  projects: ProjectInfoPreviewResponseDto[];
}
