import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProjectResponseDto {
  @IsString()
  @IsNotEmpty()
  projectId: string;
}
