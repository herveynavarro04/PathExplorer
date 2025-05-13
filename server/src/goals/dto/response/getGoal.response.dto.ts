import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class GetGoalResponseDto {
  @IsBoolean()
  @IsNotEmpty()
  completed: boolean;

  @IsBoolean()
  @IsNotEmpty()
  validated: boolean;

  @IsString()
  @IsNotEmpty()
  information: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  term: Date;
}
