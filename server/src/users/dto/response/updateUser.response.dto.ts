import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserResponseDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsDate()
  @IsNotEmpty()
  lastUpdate: Date;
}
