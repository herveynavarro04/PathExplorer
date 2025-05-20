import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class GetCertificateByIdResponseDto {
  @IsString()
  @IsNotEmpty()
  certificateId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  information: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsDate()
  @IsNotEmpty()
  obtainedAt: Date;
}
