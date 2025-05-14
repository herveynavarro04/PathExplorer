import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class PostStoryResponseDto {
  @IsString()
  @IsNotEmpty()
  historyId: string;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;
}
