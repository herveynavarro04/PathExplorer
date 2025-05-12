import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtGuard } from 'src/common/Guards/jwt.guards';
import { ProjectsResponseDto } from './dto/response/projects.response.dto';
import { ProjectsInfoResponseDto } from './dto/response/projectsInfo.response.dto';
import { GetProjectsTechResponseDto } from './dto/response/getProjectsTech.response.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getAvailableProjects(): Promise<ProjectsResponseDto> {
    return this.projectsService.getAvailableProjects();
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
