import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteEmployeeResponseDto {
  @IsString()
  @IsNotEmpty()
  employeeId: string;
}
