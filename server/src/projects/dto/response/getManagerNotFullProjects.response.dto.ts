import { IsNotEmpty, IsString } from 'class-validator';

export class GetManagerNotFullProjectsResponseDto {
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsNotEmpty()
  projectName: string;
}
