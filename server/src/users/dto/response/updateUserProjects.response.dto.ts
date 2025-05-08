import { IsArray, IsDate, IsNotEmpty } from 'class-validator';

export class UpdateUserProjectsResponseDto {
  @IsArray()
  @IsNotEmpty()
  addedProjects: string[];

  @IsArray()
  @IsNotEmpty()
  deletedProjects: string[];

  @IsDate()
  @IsNotEmpty()
  lastUpdate: Date;
}
