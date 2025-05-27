import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateProjectRequestDto {
  @IsString()
  @IsOptional()
  client?: string;

  @IsDate()
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @IsOptional()
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
