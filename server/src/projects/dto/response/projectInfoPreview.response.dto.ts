import {
  IsArray,
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

  @IsArray()
  @IsNotEmpty()
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
