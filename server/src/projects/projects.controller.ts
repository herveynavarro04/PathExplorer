import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/common/Guards/jwt.guards';
import { GetAvailableResponseDto } from './dto/response/getAvailableProjects.response.dto';
import { GetProjectsTechResponseDto } from './dto/response/getProjectsTech.response.dto';
import { ProjectsInfoResponseDto } from './dto/response/projectsInfo.response.dto';
import { UpdateEmployeeProjectsRequestDto } from './dto/request/updateEmployeeProjects.request.dto';
import { UpdateEmployeeProjectsResponseDto } from './dto/response/updateEmployeeProjects.response.dto';
import { ProjectsService } from './service/projects.service';
import { EmployeeProjectsService } from './service/employeeProjects.service';
import { GetEmployeeProjectsResponseDto } from './dto/response/getEmployeeProjectsResponse.dto';

@Controller('projects')
export class ProjectsController {
  constructor(
    private projectsService: ProjectsService,
    private employeeProjectsService: EmployeeProjectsService,
  ) {}

  @Get('techs')
  @UseGuards(JwtGuard)
  async getProjectsTech(): Promise<GetProjectsTechResponseDto> {
    return this.projectsService.getProjectsTech();
  }

  @Get('employee')
  @UseGuards(JwtGuard)
  async getEmployeeProjects(
    @Req() req: Request,
  ): Promise<GetEmployeeProjectsResponseDto> {
    const employeeId = req.user['employeeId'];
    return this.employeeProjectsService.getEmployeeProjects(employeeId);
  }

  @Get('employee/manager')
  @UseGuards(JwtGuard)
  async getManagerProjects(
    @Req() req: Request,
  ): Promise<GetEmployeeProjectsResponseDto> {
    const employeeId = req.user['employeeId'];
    return this.employeeProjectsService.getEmployeeProjects(employeeId);
  }

  @Get('employee/available')
  @UseGuards(JwtGuard)
  async getAvailableProjects(
    @Req() req: Request,
  ): Promise<GetAvailableResponseDto> {
    const employeeId = req.user['employeeId'];
    return this.employeeProjectsService.getEmployeeAvailableProjects(
      employeeId,
    );
  }

  @Patch('employee')
  @UseGuards(JwtGuard)
  async updateEmployeeProjects(
    @Body() updatePayload: UpdateEmployeeProjectsRequestDto,
    @Req() req: Request,
  ): Promise<UpdateEmployeeProjectsResponseDto> {
    const employeeId = req.user['employeeId'];
    return this.employeeProjectsService.updateEmployeeProjects(
      employeeId,
      updatePayload,
    );
  }

  @Get(':projectId')
  @UseGuards(JwtGuard)
  async getProjectInfo(
    @Param('projectId') projectId: string,
  ): Promise<ProjectsInfoResponseDto> {
    return this.projectsService.getProjectInfo(projectId);
  }
}
