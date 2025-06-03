import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCertificateStatusRequestDto {
  @IsString()
  @IsNotEmpty()
  status: string;
}
