import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsEntity } from './entities/projects.entity';
import { Repository } from 'typeorm';
import { ProjectsResponseDto } from './dto/response/projects.response.dto';
import { ProjectsInfoResponseDto } from './dto/response/projectsInfo.response.dto';
import { TechDto } from 'src/common/dto/tech.dto';
import { DatabaseHelperService } from 'src/common/helpers/dataBase.helper';
import { GetProjectsTechResponseDto } from './dto/response/getProjectsTech.response.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private projectsRepository: Repository<ProjectsEntity>,
    private dBHelperService: DatabaseHelperService,
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
        relations: ['technologies'],
      });

      if (!project) {
        Logger.warn(`Project with ID ${projectId} not found`, 'ProjectService');
        throw new NotFoundException(`Project with ID ${projectId} not found`);
      }

      const projectTechnologies: TechDto[] = project.technologies.map(
        (tech) => ({
          techId: tech.technologyId,
          techName: tech.technologyName,
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
        techId: techs.id_technology,
        techName: techs.technology_name,
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
