import { IsNotEmpty, IsString } from 'class-validator';

export class PostPeopleLeadApplicationResponseDto {
  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsString()
  @IsNotEmpty()
  createdAt: Date;
}
