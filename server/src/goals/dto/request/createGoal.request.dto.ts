import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateGoalRequestDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  goalId: string;

  @IsBoolean()
  @IsNotEmpty()
  completed: boolean;

  @IsBoolean()
  @IsNotEmpty()
  validated: boolean;

  @IsString()
  @IsNotEmpty()
  reviserId: string;

  @IsString()
  @IsNotEmpty()
  information: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  term: Date;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;
}
