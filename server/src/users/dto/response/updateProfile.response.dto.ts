import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UpdateProfileResponseDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsDate()
  @IsNotEmpty()
  lastUpdate: Date;
}
