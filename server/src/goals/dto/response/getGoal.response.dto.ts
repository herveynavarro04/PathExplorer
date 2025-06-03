import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class GetGoalResponseDto {
  @IsString()
  @IsNotEmpty()
  goalId: string;

  @IsBoolean()
  @IsNotEmpty()
  completed: boolean;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  information: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  term: Date;
}
