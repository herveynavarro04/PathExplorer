import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
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

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
