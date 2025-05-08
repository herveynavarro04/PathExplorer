import { IsArray, IsOptional } from 'class-validator';

export class UpdateUserProjectsRequestDto {
  @IsArray()
  @IsOptional()
  addProjects?: string[];

  @IsArray()
  @IsOptional()
  deleteProjects?: string[];
}
