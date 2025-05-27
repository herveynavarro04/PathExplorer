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
export class ProjectInfoPreviewResponseDto {
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsNotEmpty()
  projectName: string;

  @IsString()
  @IsNotEmpty()
  information: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsBoolean()
  @IsNotEmpty()
  active?: boolean;

  @IsArray()
  @IsOptional()
  technologies?: TechDto[];

  @IsString()
  @IsOptional()
  client?: string;

  @IsDate()
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @IsOptional()
  endDate?: Date;

  @IsNumber()
  @IsOptional()
  progress?: number;
}
