import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserSkillsResponseDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsDate()
  @IsNotEmpty()
  lastUpdate: Date;
}
