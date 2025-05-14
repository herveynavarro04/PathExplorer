import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UpdateHistoryResponseDto {
  @IsString()
  @IsNotEmpty()
  historyId: string;

  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}
