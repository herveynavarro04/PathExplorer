import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UpdateEmployeeResponseDto {
  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsDate()
  @IsNotEmpty()
  lastUpdate: Date;
}
