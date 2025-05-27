import { IsArray, IsOptional } from 'class-validator';

export class UpdateProjectTechRequestDto {
  @IsArray()
  @IsOptional()
  addTechs?: string[];

  @IsArray()
  @IsOptional()
  deleteTechs?: string[];
}
