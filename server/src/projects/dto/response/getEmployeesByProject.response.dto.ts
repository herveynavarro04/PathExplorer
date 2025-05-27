import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetEmployeesByProjectResponseDto {
  @IsString()
  @IsNotEmpty()
  profilePic: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsNotEmpty()
  employeeName: string;

  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsNumber()
  @IsNotEmpty()
  chargeability: number;
}
