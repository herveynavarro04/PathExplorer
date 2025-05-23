import { IsArray, IsOptional } from 'class-validator';
import { GetEmployeesResponseDto } from './getEmployees.response.dto';

export class GetManagerEmployeesResponseDto {
  @IsArray()
  @IsOptional()
  employees: GetEmployeesResponseDto[];
}
