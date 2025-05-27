import { IsNotEmpty, IsString } from 'class-validator';

export class PostProjectResponseDto {
  @IsString()
  @IsNotEmpty()
  projectId: string;
}
