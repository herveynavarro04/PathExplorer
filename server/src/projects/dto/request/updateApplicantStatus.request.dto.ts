import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateApplicantStatusRequestDto {
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  position: string;
}
