import { IsArray, IsOptional } from 'class-validator';
import { GetEmployeesResponseDto } from './getEmployees.response.dto';

export class GetEmployeesListResponseDto {
  @IsArray()
  @IsOptional()
  employees: GetEmployeesResponseDto[];
}
