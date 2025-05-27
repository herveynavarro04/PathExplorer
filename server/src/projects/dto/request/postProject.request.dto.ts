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
  @IsNotEmpty()
  startDate: Date;

  @IsDate()
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

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @IsArray()
  @IsOptional()
  projectEmployees?: string[];
}
