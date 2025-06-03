import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetPeopleLeadEmployeesResponseDto {
  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNumber()
  @IsNotEmpty()
  level: number;
}
