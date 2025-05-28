import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class PostProjectRequestDto {
  @IsString()
  @IsNotEmpty()
  projectName: string;

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
  projectType: string;

  @IsString()
  @IsNotEmpty()
  client: string;

  @IsString()
  @IsNotEmpty()
  information: string;

  @IsNumber()
  @IsNotEmpty()
  limitEmployees: number;

  @IsArray()
  @IsOptional()
  projectTechs?: string[];

  @IsArray()
  @IsOptional()
  projectEmployees?: string[];
}
