import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UpdateApplicantStatusResponseDto {
  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsDate()
  @IsNotEmpty()
  validatedAt: Date;
}
