import { IsArray, IsOptional } from 'class-validator';

export class UpdateEmployeeProjectsRequestDto {
  @IsArray()
  @IsOptional()
  addProjects?: string[];

  @IsArray()
  @IsOptional()
  deleteProjects?: string[];
}
