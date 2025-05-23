import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetEmployeesResponseDto {
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

  @IsNumber()
  @IsNotEmpty()
  chargeability: number;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsNumber()
  @IsNotEmpty()
  skillCount: number;

  @IsNumber()
  @IsNotEmpty()
  interestCount: number;
}
