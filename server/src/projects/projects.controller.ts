import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtGuard } from 'src/common/Guards/jwt.guards';
import { GetAvailableResponseDto } from './dto/response/getAvailableProjects.response.dto';
import { ProjectsInfoResponseDto } from './dto/response/projectsInfo.response.dto';
import { Request } from 'express';
import { GetProjectsTechResponseDto } from './dto/response/getProjectsTech.response.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get('available')
  @UseGuards(JwtGuard)
  async getAvailableProjects(
    @Req() req: Request,
  ): Promise<GetAvailableResponseDto> {
    const userId = req.user['userId'];
    return this.projectsService.getAvailableProjects(userId);
  }

  @Get('techs')
  @UseGuards(JwtGuard)
  async getProjectsTech(): Promise<GetProjectsTechResponseDto> {
    return this.projectsService.getProjectsTech();
  }

  @Get(':projectId')
  @UseGuards(JwtGuard)
  async getProjectInfo(
    @Param('projectId') projectId: string,
  ): Promise<ProjectsInfoResponseDto> {
    return this.projectsService.getProjectInfo(projectId);
  }
}
