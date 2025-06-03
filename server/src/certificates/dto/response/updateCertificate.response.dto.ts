import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UpdateCertificateResponseDto {
  @IsString()
  @IsNotEmpty()
  certificateId: string;

  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}
