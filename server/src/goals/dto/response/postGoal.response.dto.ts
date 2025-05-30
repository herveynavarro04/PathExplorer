import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class PostGoalResponseDto {
  @IsString()
  @IsNotEmpty()
  goaldId: string;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;
}
