import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteCertificateResponseDto {
  @IsString()
  @IsNotEmpty()
  certificateId: string;
}
