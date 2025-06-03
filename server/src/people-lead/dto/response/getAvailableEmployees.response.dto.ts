import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetAvailableEmployeesResponseDto {
  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  level: string;

  @IsNumber()
  @IsNotEmpty()
  skillCount: number;

  @IsNumber()
  @IsNotEmpty()
  interestCount: number;
}
