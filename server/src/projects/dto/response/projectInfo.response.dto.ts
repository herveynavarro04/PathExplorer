import { IsNotEmpty, IsString } from 'class-validator';
export class ProjectInfoResponseDto {
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsNotEmpty()
  projectName: string;

  @IsString()
  @IsNotEmpty()
  information: string;
}
