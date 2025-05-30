import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateApplicantStatusRequestDto {
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsOptional()
  position?: string;
}
