import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateGoalResponseDto {
  @IsString()
  @IsNotEmpty()
  goaldId: string;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;
}
