import { IsArray, IsOptional } from 'class-validator';
import { ProjectInfoResponseDto } from 'src/projects/dto/response/projectInfo.response.dto';
export class GetUserProjectsResponseDto {
  @IsArray()
  @IsOptional()
  projects: ProjectInfoResponseDto[];
}
