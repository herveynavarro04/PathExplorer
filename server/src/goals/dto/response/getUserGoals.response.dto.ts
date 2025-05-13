import { IsArray, IsOptional } from 'class-validator';
import { GetGoalResponseDto } from './getGoal.response.dto';

export class GetUserGoalsResponseDto {
  @IsArray()
  @IsOptional()
  userGoals: GetGoalResponseDto[];
}
