import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetPeopleLeadApplicants {
  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDate()
  @IsNotEmpty()
  appliedAt: Date;

  @IsNumber()
  @IsNotEmpty()
  skillCount: number;

  @IsNumber()
  @IsNotEmpty()
  interestCount: number;
}
