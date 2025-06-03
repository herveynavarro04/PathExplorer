import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UpdateGoalStatusResponseDto {
  @IsString()
  @IsNotEmpty()
  goalId: string;

  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}
