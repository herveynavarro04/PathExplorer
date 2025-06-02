import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProjectRequestDto {
  @IsString()
  @IsOptional()
  client?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  startDate?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  endDate?: Date;

  @IsString()
  @IsOptional()
  information?: string;

  @IsNumber()
  @IsOptional()
  progress?: number;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
