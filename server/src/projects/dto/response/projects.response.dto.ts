import { IsArray, IsNotEmpty } from 'class-validator';
import { ProjectInfoResponseDto } from './projectInfo.response.dto';

export class ProjectsResponseDto {
  @IsArray()
  @IsNotEmpty()
  availableProjects: ProjectInfoResponseDto[];
}
