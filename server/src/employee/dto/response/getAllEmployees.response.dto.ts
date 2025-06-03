import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetAllEmployeesResponseDto {
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
  rol: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  level: number;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;
}
