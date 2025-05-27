import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateEmployeesFromProjectResponseDto {
  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsString()
  @IsNotEmpty()
  projectId: string;
}
