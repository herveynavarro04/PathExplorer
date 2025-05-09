import { IsArray, IsOptional } from 'class-validator';

export class SkillsResponseDto {
  @IsArray()
  @IsOptional()
  technicalSkills?: object[];

  @IsArray()
  @IsOptional()
  softSkills?: object[];
}
