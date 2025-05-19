import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TechDto } from 'src/common/dto/tech.dto';
import { TechnologiesEntity } from 'src/common/entities/technology.entity';
import { ProjectsEntity } from '../entities/projects.entity';
import { GetProjectsTechResponseDto } from '../dto/response/getProjectsTech.response.dto';
import { ProjectsInfoResponseDto } from '../dto/response/projectsInfo.response.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private projectsRepository: Repository<ProjectsEntity>,

    @InjectRepository(TechnologiesEntity)
    private technologiesRepository: Repository<TechnologiesEntity>,
  ) {}

  async getProjectInfo(projectId: string): Promise<ProjectsInfoResponseDto> {
    try {
      const project = await this.projectsRepository.findOne({
        where: { projectId },
        relations: [
          'projectTechnologyLink',
          'projectTechnologyLink.technology',
        ],
      });

      if (!project) {
        Logger.warn(`Project with ID ${projectId} not found`, 'ProjectService');
        throw new NotFoundException(`Project with ID ${projectId} not found`);
      }

      const projectTechnologies: TechDto[] = project.projectTechnologyLink.map(
        (tech) => ({
          technologyId: tech.technologyId,
          technologyName: tech.technology.technologyName,
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
        manager: project.managerName,
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
      const availableTechs = await this.technologiesRepository.find({
        select: ['technologyName', 'technologyId'],
      });

      Logger.log('All projects techs fetched', 'ProjectsService');
      const projectsTechs: TechDto[] = availableTechs.map((techs) => ({
        technologyId: techs.technologyId,
        technologyName: techs.technologyName,
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
