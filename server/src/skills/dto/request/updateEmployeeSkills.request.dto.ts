import { IsArray, IsOptional } from 'class-validator';

export class UpdateEmployeeSkillsRequestDto {
  @IsArray()
  @IsOptional()
  addSkills?: string[];

  @IsArray()
  @IsOptional()
  deleteSkills?: string[];
}
