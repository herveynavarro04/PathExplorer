import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtGuard } from 'src/common/Guards/jwt.guards';
import { ProjectsResponseDto } from './dto/response/projects.response.dto';
import { ProjectInfoResponseDto } from './dto/response/projectInfo.response.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getAvailableProjects(): Promise<ProjectsResponseDto> {
    return this.projectsService.getAvailableProjects();
  }

  @Get(':projectId')
  @UseGuards(JwtGuard)
  async getProjectInfo(
    @Param('projectId') projectId: string,
  ): Promise<ProjectInfoResponseDto> {
    return this.projectsService.getProjectInfo(projectId);
  }
}
