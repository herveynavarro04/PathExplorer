import { IsArray, IsDate, IsNotEmpty } from 'class-validator';

export class UpdateEmployeeProjectsResponseDto {
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
