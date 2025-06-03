import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePeopleLeadApplicationStatusRequestDto {
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsArray()
  @IsOptional()
  employeesAssigned: string[];
}
