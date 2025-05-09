import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class GetUserGoalsResponseDto {
  @IsString()
  @IsNotEmpty()
  goalId: string;

  @IsString()
  @IsNotEmpty()
  information: string;

  @IsDate()
  @IsNotEmpty()
  term: Date;

  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  endDate: Date;

  @IsBoolean()
  @IsNotEmpty()
  completed: boolean;

  @IsBoolean()
  @IsNotEmpty()
  validated: boolean;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  reviserId: string;
}
