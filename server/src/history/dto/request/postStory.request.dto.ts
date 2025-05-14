import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class PostStoryRequestDto {
  @IsString()
  @IsNotEmpty()
  information: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  company: string;
}
