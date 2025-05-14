import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateHistoryRequestDto {
  @IsString()
  @IsNotEmpty()
  historyId: string;

  @IsString()
  @IsOptional()
  information?: string;

  @IsString()
  @IsOptional()
  position?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: Date;

  @IsString()
  @IsOptional()
  company?: string;
}
