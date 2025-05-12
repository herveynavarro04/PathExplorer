import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TechDto } from 'src/common/dto/tech.dto';

export class ProjectsInfoResponseDto {
  @IsString()
  @IsNotEmpty()
  projectId: string;

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

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @IsString()
  @IsNotEmpty()
  information: string;

  @IsBoolean()
  @IsOptional()
  full?: boolean;

  @IsNumber()
  @IsOptional()
  limitEmployees?: number;

  @IsString()
  @IsNotEmpty()
  manager: string;

  @IsArray()
  @IsNotEmpty()
  technologies: TechDto[];
}
