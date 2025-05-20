import { IsArray, IsNotEmpty } from 'class-validator';
import { IProjectsInfo } from 'src/agent/interfaces/projectsInfo.interface';

export class ProjectRecomendationsResponseDto {
  @IsArray()
  @IsNotEmpty()
  projectRecs: IProjectsInfo[];
}
