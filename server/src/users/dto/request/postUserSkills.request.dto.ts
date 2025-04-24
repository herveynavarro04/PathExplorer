import { IsArray, IsNotEmpty } from 'class-validator';

export class UpdateUserSkillsRequestDto {
  @IsArray()
  @IsNotEmpty()
  skills: string[];
}
