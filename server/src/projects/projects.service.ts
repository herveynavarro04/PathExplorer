import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsEntity } from './entities/projects.entity';
import { Repository } from 'typeorm';
import { ProjectsResponseDto } from './dto/response/projects.response.dto';
import { ProjectInfoResponseDto } from './dto/response/projectInfo.response.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private projectsRepository: Repository<ProjectsEntity>,
  ) {}

  async getAvailableProjects(): Promise<ProjectsResponseDto> {
    try {
      const projects = await this.projectsRepository.find({
        where: { active: true, full: false },
        select: ['projectId', 'projectName', 'information'],
      });
      Logger.log('Projects fetched!', 'ProjectService');
      return {
        availableProjects: projects.map((project) => ({
          projectId: project.projectId,
          projectName: project.projectName,
          information: project.information,
        })),
      };
    } catch (error) {
      Logger.error(
        'Error during projects fetching',
        error.stack,
        'ProjectService',
      );
      throw new InternalServerErrorException('Failed to get projects');
    }
  }

  async getProjectInfo(projectId: string): Promise<ProjectInfoResponseDto> {
    try {
      const project = await this.projectsRepository.findOne({
        where: { projectId },
      });
      Logger.log('Project info fetched!', 'ProjectService');
      return project;
    } catch (error) {
      Logger.error(
        'Error during project info fetching',
        error.stack,
        'ProjectService',
      );
      throw new InternalServerErrorException('Failed to get project info');
    }
  }
}
