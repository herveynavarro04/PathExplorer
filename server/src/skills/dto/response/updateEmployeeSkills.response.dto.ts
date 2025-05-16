import { IsArray, IsDate, IsNotEmpty } from 'class-validator';

export class UpdateEmployeeSkillsResponseDto {
  @IsArray()
  @IsNotEmpty()
  addedSkills: string[];

  @IsArray()
  @IsNotEmpty()
  deletedSkills: string[];

  @IsDate()
  @IsNotEmpty()
  lastUpdate: Date;
}
