import { IsNotEmpty, IsString } from 'class-validator';

export class PostCertificateResponseDto {
  @IsString()
  @IsNotEmpty()
  certificateId: string;

  @IsString()
  @IsNotEmpty()
  createdAt: Date;
}
