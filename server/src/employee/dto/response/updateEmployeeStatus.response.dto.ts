import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UpdateEmployeeStatusResponseDto {
  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}
