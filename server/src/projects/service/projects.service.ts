import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { TechDto } from 'src/common/dto/tech.dto';
import { TechnologiesEntity } from 'src/common/entities/technology.entity';
import { ProjectsEntity } from '../entities/projects.entity';
import { GetProjectsTechResponseDto } from '../dto/response/getProjectsTech.response.dto';
import { ProjectsInfoResponseDto } from '../dto/response/projectsInfo.response.dto';
import { UpdateProjectRequestDto } from '../dto/request/updateProject.request.dto';
import { UpdateProjectResponseDto } from '../dto/response/updateProject.response.dto';
import { ProjectTechnologyEntity } from 'src/common/entities/projectTechnologies.entity';
import { UpdateProjectTechRequestDto } from '../dto/request/updateProjectTechs.request.dto';
import { PostProjectRequestDto } from '../dto/request/postProject.request.dto';
import { PostProjectResponseDto } from '../dto/response/postProject.response.dto';
import { v4 as uuidv4 } from 'uuid';
import { EmployeeProjectsService } from './employeeProjects.service';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly employeeProjectService: EmployeeProjectsService,
    @InjectRepository(ProjectsEntity)
    private projectsRepository: Repository<ProjectsEntity>,
    @InjectRepository(ProjectTechnologyEntity)
    private projectTechsRepostitory: Repository<ProjectTechnologyEntity>,
    @InjectRepository(TechnologiesEntity)
    private technologiesRepository: Repository<TechnologiesEntity>,
  ) {}

  async postProject(
    employeeId: string,
    postProjectPayload: PostProjectRequestDto,
  ): Promise<PostProjectResponseDto> {
    try {
      let projectFull = false;
      if (
        postProjectPayload.projectEmployees?.length >=
        postProjectPayload.limitEmployees
      ) {
        projectFull = true;
      }
      const projectId = uuidv4();
      const newProject: ProjectsEntity = {
        managerId: employeeId,
        projectId: projectId,
        progress: 0,
        active: false,
        full: projectFull,
        ...postProjectPayload,
        createdAt: new Date(),
        updatedAt: null,
      };
      await this.projectsRepository.save(newProject);
      const projectTechs = postProjectPayload.projectTechs.map((techId) => ({
        projectId: projectId,
        technologyId: techId,
        createdAt: new Date(),
      }));
      await this.projectTechsRepostitory.save(projectTechs);
      if (postProjectPayload.projectEmployees) {
        await this.employeeProjectService.addEmployeesToNewProject(
          projectId,
          postProjectPayload.projectEmployees,
        );
      }
      Logger.log('Project created!', 'ProjectService');
      return {
        projectId: projectId,
      };
    } catch (error) {
      Logger.error(
        'Error during new project saving',
        error.stack,
        'ProjectService',
      );
      throw new InternalServerErrorException('Failed to save new project');
    }
  }

  async getProjectInfo(projectId: string): Promise<ProjectsInfoResponseDto> {
    try {
      const project = await this.projectsRepository.findOne({
        where: { projectId },
        relations: [
          'projectTechnologyLink',
          'projectTechnologyLink.technology',
          'employeeProjectLink.employee',
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

      const manager = project.employeeProjectLink?.find(
        (link) => link.employee?.employeeId === project.managerId,
      )?.employee;

      const result: ProjectsInfoResponseDto = {
        projectId: project.projectId,
        projectName: project.projectName,
        startDate: project.startDate,
        endDate: project.endDate,
        projectType: project.projectType,
        client: project.client,
        active: project.active,
        information: project.information,
        manager: manager ? `${manager.firstName} ${manager.lastName}` : null,
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

  async updateProjetInfo(
    projectId: string,
    updatePayload: UpdateProjectRequestDto,
  ): Promise<UpdateProjectResponseDto> {
    try {
      await this.projectsRepository.update(
        { projectId: projectId },
        { ...updatePayload, updatedAt: new Date() },
      );
      Logger.log('Project succesfully updated', 'ProjectService');
      return {
        projectId: projectId,
      };
    } catch (error) {
      Logger.error(
        'Error during projects info update',
        error.stack,
        'ProjectsService',
      );
      throw new InternalServerErrorException('Failed to update project info');
    }
  }

  async updateProjectTechs(
    projectId: string,
    updatePayload: UpdateProjectTechRequestDto,
  ): Promise<UpdateProjectResponseDto> {
    try {
      if (updatePayload.addTechs) {
        const techsToAdd = updatePayload.addTechs.map((techId) => ({
          projectId: projectId,
          technologyId: techId,
          createdAt: new Date(),
        }));
        await this.projectTechsRepostitory.save(techsToAdd);
      }
      if (updatePayload.deleteTechs) {
        await this.projectTechsRepostitory.delete({
          projectId: projectId,
          technologyId: In(updatePayload.deleteTechs),
        });
      }
      Logger.log('Project techs succesfully updated', 'ProjectService');
      return {
        projectId: projectId,
      };
    } catch (error) {
      Logger.error(
        'Error during projects techs update',
        error.stack,
        'ProjectsService',
      );
      throw new InternalServerErrorException('Failed to update project techs');
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
