import { IsArray, IsNotEmpty, IsObject } from 'class-validator';
import { IAvailableProjectsInterface } from 'src/agent/interfaces/availableProjects.interface';
import { IEmployeeInfo } from 'src/agent/interfaces/employeeInfo.interface';

export class ProjectRecomendationsRequestDto {
  @IsObject()
  @IsNotEmpty()
  employeeInfo: IEmployeeInfo;

  @IsArray()
  @IsNotEmpty()
  availableProjects: IAvailableProjectsInterface;
}
