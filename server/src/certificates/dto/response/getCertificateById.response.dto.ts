import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class GetCertificateByIdResponseDto {
  @IsString()
  @IsNotEmpty()
  certificateId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @IsString()
  @IsNotEmpty()
  status: string;
}
