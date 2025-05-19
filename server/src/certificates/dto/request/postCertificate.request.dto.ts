import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class PostCertificateRequestDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  information: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  obtainedAt: Date;
}
