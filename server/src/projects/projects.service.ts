import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsEntity } from './entities/projects.entity';
import { DataSource, Repository } from 'typeorm';
import { ProjectsResponseDto } from './dto/response/projects.response.dto';
import { ProjectsInfoResponseDto } from './dto/response/projectsInfo.response.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private projectsRepository: Repository<ProjectsEntity>,
    private readonly dataSource: DataSource,
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

  async getProjectInfo(projectId: string): Promise<ProjectsInfoResponseDto> {
    try {
      const project = await this.projectsRepository.findOne({
        where: { projectId },
      });

      const projectTechnologies = await this.getProjectTechnologies(projectId);
      const result: ProjectsInfoResponseDto = {
        projectId: project.projectId,
        projectName: project.projectName,
        startDate: project.startDate,
        endDate: project.endDate,
        projectType: project.projectType,
        client: project.client,
        active: project.active,
        information: project.information,
        manager: project.manager,
        technologies: projectTechnologies,
      };
      Logger.log('Project info fetched!', 'ProjectService');
      return result;
    } catch (error) {
      Logger.error(
        'Error during project info fetching',
        error.stack,
        'ProjectService',
      );
      throw new InternalServerErrorException('Failed to get project info');
    }
  }

  private async getProjectTechnologies(projectId: string): Promise<string[]> {
    const technologies = await this.dataSource
      .createQueryBuilder()
      .select('t.technology_name', 'technologies')
      .from('project_technologies', 'pt')
      .innerJoin('technologies', 't', 'pt.id_technology = t.id_technology')
      .where('pt.id_project = :projectId', { projectId })
      .getRawMany();

    return technologies.map((t) => t.technologies);
  }
}
