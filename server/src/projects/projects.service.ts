import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsEntity } from './entities/projects.entity';
import { In, Not, Repository } from 'typeorm';
import { ProjectsInfoResponseDto } from './dto/response/projectsInfo.response.dto';
import { TechDto } from 'src/common/dto/tech.dto';
import { DatabaseHelperService } from 'src/common/helpers/dataBase.helper';
import { GetProjectsTechResponseDto } from './dto/response/getProjectsTech.response.dto';
import { GetAvailableResponseDto } from './dto/response/getAvailableProjects.response.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private projectsRepository: Repository<ProjectsEntity>,
    private dBHelperService: DatabaseHelperService,
  ) {}

  async getAvailableProjects(userId: string): Promise<GetAvailableResponseDto> {
    try {
      const subscribedProjectIds = await this.getSubscribedProjectIds(userId);
      const projects = await this.projectsRepository.find({
        where: {
          active: true,
          full: false,
          projectId: Not(In(subscribedProjectIds)),
        },
        relations: ['technologies'],
        select: ['projectId', 'projectName', 'information'],
      });

      const userProjects = projects.map((project) => ({
        projectId: project.projectId,
        projectName: project.projectName,
        information: project.information,
        technologies: project.technologies.map((tech) => ({
          technologyId: tech.technologyId,
          technologyName: tech.technologyName,
        })),
      }));
      Logger.log('Available projects fetched!', 'ProjectService');
      return { availableProjects: userProjects };
    } catch (error) {
      Logger.error(
        'Error fetching available projects',
        error.stack,
        'ProjectsService',
      );
      throw new InternalServerErrorException(
        'Failed to fetch available projects',
      );
    }
  }

  private async getSubscribedProjectIds(userId: string): Promise<string[]> {
    try {
      const subscribedProjects = await this.dBHelperService.selectMany(
        'project_user',
        { userid: userId },
        undefined,
        undefined,
        undefined,
        undefined,
        ['id_project'],
      );

      return subscribedProjects.map((p) => p.id_project);
    } catch (error) {
      Logger.error(
        'Error fetching subscribed project IDs',
        error.stack,
        'ProjectsService',
      );
      throw new InternalServerErrorException(
        'Failed to fetch subscribed project IDs',
      );
    }
  }

  async getProjectInfo(projectId: string): Promise<ProjectsInfoResponseDto> {
    try {
      const project = await this.projectsRepository.findOne({
        where: { projectId },
        relations: ['technologies'],
      });

      if (!project) {
        Logger.warn(`Project with ID ${projectId} not found`, 'ProjectService');
        throw new NotFoundException(`Project with ID ${projectId} not found`);
      }

      const projectTechnologies: TechDto[] = project.technologies.map(
        (tech) => ({
          technologyId: tech.technologyId,
          technologyName: tech.technologyName,
        }),
      );

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
  async getProjectsTech(): Promise<GetProjectsTechResponseDto> {
    try {
      const availableTechs = await this.dBHelperService.selectMany(
        'technologies',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        ['id_technology', 'technology_name'],
      );

      Logger.log('All projects techs fetched', 'ProjectsService');
      const projectsTechs: TechDto[] = availableTechs.map((techs) => ({
        technologyId: techs.id_technology,
        technologyName: techs.technology_name,
      }));

      return {
        ProjectsTechs: projectsTechs,
      };
    } catch (error) {
      Logger.error(
        'Error during fetching project technologies',
        error.stack,
        'ProjectsService',
      );
      throw new InternalServerErrorException(
        'Failed to fetch project technologies',
      );
    }
  }
}
