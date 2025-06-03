import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UpdatePeopleLeadApplicationStatusResponseDto {
  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}
