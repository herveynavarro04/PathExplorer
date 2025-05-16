import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class GetEmployeeGoalsResponseDto {
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
  employeeId: string;

  @IsString()
  @IsNotEmpty()
  reviserId: string;
}
