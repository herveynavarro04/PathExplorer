import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteHistoryResponseDto {
  @IsString()
  @IsNotEmpty()
  historyId: string;
}
