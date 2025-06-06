import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/Guards/jwt.guards';
import { GetAvailableResponseDto } from './dto/response/getAvailableProjects.response.dto';
import { GetProjectsTechResponseDto } from './dto/response/getProjectsTech.response.dto';
import { ProjectsInfoResponseDto } from './dto/response/projectsInfo.response.dto';
import { UpdateEmployeeProjectsRequestDto } from './dto/request/updateEmployeeProjects.request.dto';
import { UpdateEmployeeProjectsResponseDto } from './dto/response/updateEmployeeProjects.response.dto';
import { ProjectsService } from './service/projects.service';
import { EmployeeProjectsService } from './service/employeeProjects.service';
import { GetEmployeeProjectsResponseDto } from './dto/response/getEmployeeProjectsResponse.dto';
import { GetEmployeesByProjectResponseDto } from './dto/response/getEmployeesByProject.response.dto';
import { UpdateProjectResponseDto } from './dto/response/updateProject.response.dto';
import { UpdateProjectRequestDto } from './dto/request/updateProject.request.dto';
import { UpdateProjectTechRequestDto } from './dto/request/updateProjectTechs.request.dto';
import { UpdateEmployeesFromProjectResponseDto } from './dto/response/upateEmployeesFromProject.response.dto';
import { PostProjectResponseDto } from './dto/response/postProject.response.dto';
import { PostProjectRequestDto } from './dto/request/postProject.request.dto';
import { GetPastProjectsResponseDto } from './dto/response/getPastProjects.response.dto';
import { GetProjectApplicants } from './dto/response/getProjectApplicants.response.dto';
import { UpdateApplicantStatusRequestDto } from './dto/request/updateApplicantStatus.request.dto';
import { UpdateApplicantStatusResponseDto } from './dto/response/updateApplicantStatus.response.dto';
import { GetManagerNotFullProjectsResponseDto } from './dto/response/getManagerNotFullProjects.response.dto';
import { GetChargeabilityResponseDto } from './dto/response/getChargeability.response.dto';
import { UpdateChargeabilityRequestDto } from './dto/request/updateChargeability.request.dto';
import { UpdateChargeabilityResponseDto } from './dto/response/updateChargeability.response.dto';

@Controller('projects')
export class ProjectsController {
  constructor(
    private projectsService: ProjectsService,
    private employeeProjectsService: EmployeeProjectsService,
  ) {}

  @Post()
  @UseGuards(JwtGuard)
  async postProject(
    @Req() req: Request,
    @Body() postProjectPayload: PostProjectRequestDto,
  ): Promise<PostProjectResponseDto> {
    const employeeId = req.user['employeeId'];
    return this.projectsService.postProject(employeeId, postProjectPayload);
  }

  @Get('techs')
  @UseGuards(JwtGuard)
  async getProjectsTech(): Promise<GetProjectsTechResponseDto> {
    return this.projectsService.getProjectsTech();
  }
  @Get('manager/notFull')
  @UseGuards(JwtGuard)
  async getManagerNotFullProjects(
    @Req() req: Request,
  ): Promise<GetManagerNotFullProjectsResponseDto[]> {
    const employeeId = req.user['employeeId'];
    return this.employeeProjectsService.getManagerNotFullProjects(employeeId);
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
    return this.employeeProjectsService.getManagerProjects(employeeId);
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

  @Patch(':projectId/:employeeId/chargeability')
  @UseGuards(JwtGuard)
  async updateChargeability(
    @Param('projectId') projectId: string,
    @Param('employeeId') employeeId: string,
    @Body() updatePayload: UpdateChargeabilityRequestDto,
  ): Promise<UpdateChargeabilityResponseDto> {
    return this.employeeProjectsService.updateChargeability(
      employeeId,
      projectId,
      updatePayload,
    );
  }

  @Get('chargeability')
  @UseGuards(JwtGuard)
  async getChargeability(
    @Req() req: Request,
  ): Promise<GetChargeabilityResponseDto> {
    const employeeId = req.user['employeeId'];
    return this.employeeProjectsService.getChargeability(employeeId);
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

  @Patch(':projectId')
  @UseGuards(JwtGuard)
  async updateProjetInfo(
    @Param('projectId') projectId: string,
    @Body() updatePayload: UpdateProjectRequestDto,
  ): Promise<UpdateProjectResponseDto> {
    return this.projectsService.updateProjetInfo(projectId, updatePayload);
  }

  @Patch(':projectId/techs')
  @UseGuards(JwtGuard)
  async updateProjetTechs(
    @Param('projectId') projectId: string,
    @Body() updatePayload: UpdateProjectTechRequestDto,
  ): Promise<UpdateProjectResponseDto> {
    return this.projectsService.updateProjectTechs(projectId, updatePayload);
  }

  @Get(':projectId/employees')
  @UseGuards(JwtGuard)
  async getEmployeesByProject(
    @Param('projectId') projectId: string,
    @Req() req: Request,
  ): Promise<GetEmployeesByProjectResponseDto[]> {
    const employeeId = req.user['employeeId'];
    return this.employeeProjectsService.getEmployeesByProject(
      projectId,
      employeeId,
    );
  }

  @Patch(':projectId/:employeeId')
  @UseGuards(JwtGuard)
  async removeEmployeesFromProject(
    @Param('projectId') projectId: string,
    @Param('employeeId') employeeId: string,
  ): Promise<UpdateEmployeesFromProjectResponseDto> {
    return this.employeeProjectsService.removeEmployeesFromProject(
      projectId,
      employeeId,
    );
  }

  @Patch(':projectId/applicant/:employeeId')
  @UseGuards(JwtGuard)
  async updateApplicantStatus(
    @Param('projectId') projectId: string,
    @Param('employeeId') employeeId: string,
    @Body()
    updatePayload: UpdateApplicantStatusRequestDto,
  ): Promise<UpdateApplicantStatusResponseDto> {
    return this.employeeProjectsService.updateApplicantStatus(
      projectId,
      employeeId,
      updatePayload,
    );
  }

  @Get(':projectId/applicants')
  @UseGuards(JwtGuard)
  async getApplicantsByProjectId(
    @Param('projectId') projectId: string,
  ): Promise<GetProjectApplicants[]> {
    return this.employeeProjectsService.getApplicantsByProjectId(projectId);
  }

  @Get('past/:employeeId')
  @UseGuards(JwtGuard)
  async getEmployeePastProjectsById(
    @Param('employeeId') employeeId: string,
  ): Promise<GetPastProjectsResponseDto[]> {
    return this.employeeProjectsService.getEmployeePastProjectsById(employeeId);
  }
}
