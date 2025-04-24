import { IsArray } from 'class-validator';

export class SkillsResponseDto {
  @IsArray()
  technicalSkills: object[];

  @IsArray()
  softSkills: object[];
}
