import { IsNotEmpty, IsString } from 'class-validator';

export class PostProjectEmployeesRequestDto {
  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsString()
  @IsNotEmpty()
  position: string;
}
