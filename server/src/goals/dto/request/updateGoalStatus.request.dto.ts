import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateGoalStatusRequestDto {
  @IsString()
  @IsNotEmpty()
  status: string;
}
