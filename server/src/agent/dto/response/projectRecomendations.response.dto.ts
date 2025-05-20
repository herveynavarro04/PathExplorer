import { IsArray, IsNotEmpty } from 'class-validator';

export class ProjectRecomendationsResponseDto {
  @IsArray()
  @IsNotEmpty()
  projects: string[];
}
