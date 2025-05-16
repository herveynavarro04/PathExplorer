import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { ProjectInfoPreviewResponseDto } from '../../projects/dto/response/projectInfoPreview.response.dto';
import { UpdateEmployeeProjectsRequestDto } from '../../projects/dto/request/updateEmployeeProjects.request.dto';
import { UpdateEmployeeProjectsResponseDto } from '../../projects/dto/response/updateEmployeeProjects.response.dto';
import { EmployeeProjectEntity } from 'src/common/entities/employeeProject.entity';
import { GetAvailableResponseDto } from '../dto/response/getAvailableProjects.response.dto';
import { ProjectsEntity } from '../entities/projects.entity';

@Injectable()
export class EmployeeProjectsService {
  constructor(
    @InjectRepository(EmployeeProjectEntity)
    private employeeProjectRepository: Repository<EmployeeProjectEntity>,

    @InjectRepository(ProjectsEntity)
    private projectsRepository: Repository<ProjectsEntity>,
  ) {}

  async getEmployeeAvailableProjects(
    employeeId: string,
  ): Promise<GetAvailableResponseDto> {
    try {
      const subscribedProjectIds =
        await this.getSubscribedProjectIds(employeeId);
      const projects = await this.projectsRepository.find({
        where: {
          active: true,
          full: false,
          projectId: Not(In(subscribedProjectIds)),
        },
        relations: [
          'projectTechnologyLink',
          'projectTechnologyLink.technology',
        ],
        select: ['projectId', 'projectName', 'information'],
      });

      const userProjects = projects.map((project) => ({
        projectId: project.projectId,
        projectName: project.projectName,
        information: project.information,
        technologies: project.projectTechnologyLink.map((tech) => ({
          technologyId: tech.technologyId,
          technologyName: tech.technology.technologyName,
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

  private async getSubscribedProjectIds(employeeId: string): Promise<string[]> {
    try {
      const subscribedProjects = await this.employeeProjectRepository.find({
        where: {
          employeeId: employeeId,
        },
        select: ['projectId'],
      });

      return subscribedProjects.map((project) => project.projectId);
    } catch (error) {
      Logger.error(
        'Error fetching subscribed projects IDs',
        error.stack,
        'ProjectsService',
      );
      throw new InternalServerErrorException(
        'Failed to fetch subscribed projects IDs',
      );
    }
  }

  async getEmployeeProjects(
    employeeId: string,
  ): Promise<ProjectInfoPreviewResponseDto[]> {
    try {
      const employeeProjects = await this.employeeProjectRepository.find({
        where: { employeeId: employeeId },
        relations: ['employee', 'project'],
      });
      if (!employeeProjects) {
        Logger.warn('employee not found', 'EmployeeProjectsService');
        throw new NotFoundException('employee not found');
      }
      Logger.log('employee projects fetched', 'EmployeeProjectsService');
      const projects: ProjectInfoPreviewResponseDto[] = employeeProjects.map(
        (employeeProjectsLink) => ({
          projectId: employeeProjectsLink.projectId,
          projectName: employeeProjectsLink.project.projectName,
          information: employeeProjectsLink.project.information,
          active: employeeProjectsLink.project.active,
          status: employeeProjectsLink.status,
        }),
      );
      return projects;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Error during delete transaction',
        error.stack,
        'EmployeeProjectsService',
      );
      throw new InternalServerErrorException(
        'Failed to fetch employee projects',
      );
    }
  }

  async updateEmployeeProjects(
    employeeId: string,
    updateProjectsPayload: UpdateEmployeeProjectsRequestDto,
  ): Promise<UpdateEmployeeProjectsResponseDto> {
    const addProjects = updateProjectsPayload.addProjects;
    const deleteProjects = updateProjectsPayload.deleteProjects;

    let addedProjects = [];
    let deletedProjects = [];

    if (addProjects) {
      addedProjects = await this.addEmployeeProjects(employeeId, addProjects);
    }
    if (deleteProjects) {
      deletedProjects = await this.deleteEmployeeProjects(
        employeeId,
        deleteProjects,
      );
    }
    return {
      addedProjects: addedProjects,
      deletedProjects: deletedProjects,
      lastUpdate: new Date(),
    };
  }

  private async addEmployeeProjects(employeeId: string, addProjects: string[]) {
    try {
      const projects = addProjects.map((projectId) => ({
        employeeId: employeeId,
        projectId: projectId,
        status: 'pending',
        chargeability: null,
        appliedAt: new Date(),
        validatedAt: null,
      }));
      await this.employeeProjectRepository.save(projects);
      Logger.log(
        'Projects successfully added to employee!',
        'EmployeeProjectsService',
      );
      return addProjects;
    } catch (error) {
      Logger.error(
        'Error adding projects to employee',
        error.stack,
        'EmployeeProjectsService',
      );
      throw new InternalServerErrorException(
        'Failed to add projects to employee',
      );
    }
  }

  private async deleteEmployeeProjects(
    employeeId: string,
    deleteProjects: string[],
  ) {
    try {
      await this.employeeProjectRepository.delete({
        employeeId: employeeId,
        projectId: In(deleteProjects),
      });
      Logger.log(
        'Projects successfully deleted from employee!',
        'EmployeeProjectsService',
      );
      return deleteProjects;
    } catch (error) {
      Logger.error(
        'Error deleting projects to employee',
        error.stack,
        'EmployeeProjectsService',
      );
      throw new InternalServerErrorException(
        'Failed to delete projects to employee',
      );
    }
  }
}
