import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsArray,
} from 'class-validator';
import { TechDto } from 'src/common/dto/tech.dto';

export class GetPastProjectsResponseDto {
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
  client: string;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @IsString()
  @IsNotEmpty()
  manager: string;

  @IsArray()
  @IsNotEmpty()
  technologies: TechDto[];

  @IsString()
  @IsNotEmpty()
  position: string;
}
