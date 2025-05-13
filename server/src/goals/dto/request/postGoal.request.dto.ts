import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class PostGoalRequestDto {
  @IsString()
  @IsNotEmpty()
  information: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  term: Date;
}
