import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeProjectEntity } from 'src/common/entities/employeeProject.entity';
import { In, Not, Repository } from 'typeorm';
import { UpdateEmployeeProjectsRequestDto } from '../../projects/dto/request/updateEmployeeProjects.request.dto';
import { ProjectInfoPreviewResponseDto } from '../../projects/dto/response/projectInfoPreview.response.dto';
import { UpdateEmployeeProjectsResponseDto } from '../../projects/dto/response/updateEmployeeProjects.response.dto';
import { GetAvailableResponseDto } from '../dto/response/getAvailableProjects.response.dto';
import { GetEmployeeProjectsResponseDto } from '../dto/response/getEmployeeProjectsResponse.dto';
import { GetEmployeesByProjectResponseDto } from '../dto/response/getEmployeesByProject.response.dto';
import { UpdateEmployeesFromProjectResponseDto } from '../dto/response/upateEmployeesFromProject.response.dto';
import { ProjectsEntity } from '../entities/projects.entity';
import { GetPastProjectsResponseDto } from '../dto/response/getPastProjects.response.dto';
import { PostProjectEmployeesRequestDto } from '../dto/request/postProjectEmployees.request.dto';
import { GetProjectApplicants } from '../dto/response/getProjectApplicants.response.dto';
import { UpdateApplicantStatusRequestDto } from '../dto/request/updateApplicantStatus.request.dto';
import { UpdateApplicantStatusResponseDto } from '../dto/response/updateApplicantStatus.response.dto';
import { GetManagerNotFullProjectsResponseDto } from '../dto/response/getManagerNotFullProjects.response.dto';

@Injectable()
export class EmployeeProjectsService {
  constructor(
    @InjectRepository(EmployeeProjectEntity)
    private employeeProjectRepository: Repository<EmployeeProjectEntity>,

    @InjectRepository(ProjectsEntity)
    private projectsRepository: Repository<ProjectsEntity>,
  ) {}

  async addEmployeesToNewProject(
    projectId: string,
    employeesArray: PostProjectEmployeesRequestDto[],
  ): Promise<void> {
    try {
      const register: EmployeeProjectEntity[] = employeesArray.map(
        (employeeInfo) => ({
          projectId,
          employeeId: employeeInfo.employeeId,
          position: employeeInfo.position,
          status: 'approved',
          chargeability: null,
          appliedAt: new Date(),
          validatedAt: new Date(),
        }),
      );
      await this.employeeProjectRepository.save(register);
      Logger.log('Employees added to new project', 'ProjectService');
    } catch (error) {
      Logger.error(
        'Error saving employees to new project',
        error.stack,
        'ProjectsService',
      );
      throw new InternalServerErrorException(
        'Failed to save employees to new project',
      );
    }
  }

  async getEmployeePastProjectsById(
    employeeId: string,
  ): Promise<GetPastProjectsResponseDto[]> {
    try {
      const employeeProjects = await this.employeeProjectRepository.find({
        where: { employeeId: employeeId, status: 'finished' },
        relations: [
          'employee',
          'project',
          'project.projectTechnologyLink',
          'project.projectTechnologyLink.technology',
          'project.employeeProjectLink',
          'project.employeeProjectLink.employee',
        ],
      });
      if (!employeeProjects) {
        Logger.warn('Employee not found', 'EmployeeProjectsService');
        throw new NotFoundException('Employee not found');
      }
      Logger.log('Employee projects fetched', 'EmployeeProjectsService');
      const projects: GetPastProjectsResponseDto[] = employeeProjects.map(
        (employeeProjectsLink) => {
          const managerLink =
            employeeProjectsLink.project.employeeProjectLink?.find(
              (link) =>
                link.employee.employeeId ===
                employeeProjectsLink.project.managerId,
            );
          return {
            projectId: employeeProjectsLink.projectId,
            projectName: employeeProjectsLink.project.projectName,
            active: employeeProjectsLink.project.active,
            position: employeeProjectsLink.position,
            client: employeeProjectsLink.project.client,
            startDate: employeeProjectsLink.project.startDate,
            endDate: employeeProjectsLink.project.endDate,
            manager: managerLink
              ? `${managerLink.employee.firstName} ${managerLink.employee.lastName}`
              : null,
            technologies:
              employeeProjectsLink.project.projectTechnologyLink.map(
                (tech) => ({
                  technologyId: tech.technologyId,
                  technologyName: tech.technology.technologyName,
                }),
              ),
          };
        },
      );
      return projects;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Error during employee projects fetching',
        error.stack,
        'EmployeeProjectsService',
      );
      throw new InternalServerErrorException(
        'Failed to fetch employee projects',
      );
    }
  }

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
  ): Promise<GetEmployeeProjectsResponseDto> {
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
      return {
        employeeProjects: projects,
      };
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

  async removeEmployeesFromProject(
    projectId: string,
    employeeId: string,
  ): Promise<UpdateEmployeesFromProjectResponseDto> {
    try {
      await this.employeeProjectRepository.update(
        { projectId: projectId, employeeId: employeeId },
        { status: 'finished' },
      );
      Logger.log(
        'employee succesfully removed from project',
        'EmployeeProjectsService',
      );
      return {
        projectId: projectId,
        employeeId: employeeId,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Error removing employee from project',
        error.stack,
        'EmployeeProjectsService',
      );
      throw new InternalServerErrorException(
        'Failed to remove employee from project',
      );
    }
  }

  async getEmployeesByProject(
    projectId: string,
    empoyeeId: string,
  ): Promise<GetEmployeesByProjectResponseDto[]> {
    try {
      const employeesInfo = await this.employeeProjectRepository.find({
        where: {
          projectId: projectId,
          employeeId: Not(In([empoyeeId])),
          status: 'approved',
        },
        select: ['employeeId', 'chargeability', 'position'],
        relations: ['employee', 'employee.profilePicture'],
      });
      Logger.log('employees fetched', 'EmployeeProjectsService');
      const employees: GetEmployeesByProjectResponseDto[] = employeesInfo.map(
        (employeeProjectsLink) => ({
          employeeId: employeeProjectsLink.employeeId,
          employeeName: `${employeeProjectsLink.employee.firstName} ${employeeProjectsLink.employee.lastName}`,
          chargeability: employeeProjectsLink.chargeability || null,
          position: employeeProjectsLink.position,
          profilePic:
            employeeProjectsLink.employee?.profilePicture?.imageData?.toString(
              'base64',
            ) || process.env.DEFAULT_PROFILE_IMAGE,
        }),
      );
      return employees;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Error during employees by project fetching transaction',
        error.stack,
        'EmployeeProjectsService',
      );
      throw new InternalServerErrorException(
        'Failed to fetch employees by projects',
      );
    }
  }

  async changeEmployeesStatusOnProjectFinish(projectId: string): Promise<void> {
    try {
      await this.employeeProjectRepository.update(
        { projectId: projectId, status: 'pending' },
        { status: 'rejected' },
      );
      await this.employeeProjectRepository.update(
        {
          projectId: projectId,
          status: 'approved',
        },
        { status: 'finished', chargeability: 0 },
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Error during employees status update',
        error.stack,
        'EmployeeProjectsService',
      );
      throw new InternalServerErrorException(
        'Failed to update employees status',
      );
    }
  }

  private async checkProjectCapacity(projectId: string): Promise<void> {
    try {
      const employeesNumber = await this.employeeProjectRepository.count({
        where: {
          projectId: projectId,
          status: 'approved',
          position: Not('manager'),
        },
      });
      const project = await this.projectsRepository.findOne({
        where: { projectId: projectId },
        select: ['limitEmployees'],
      });
      if (project && employeesNumber >= project.limitEmployees) {
        await this.projectsRepository.update(
          { projectId: projectId },
          { full: true },
        );
        await this.employeeProjectRepository.update(
          {
            projectId: projectId,
            status: 'pending',
          },
          { status: 'rejected' },
        );
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Error during project status update',
        error.stack,
        'EmployeeProjectsService',
      );
      throw new InternalServerErrorException(
        'Failed to project applicant status',
      );
    }
  }

  async updateApplicantStatus(
    projectId: string,
    employeeId: string,
    updatePayload: UpdateApplicantStatusRequestDto,
  ): Promise<UpdateApplicantStatusResponseDto> {
    try {
      await this.employeeProjectRepository.update(
        {
          projectId: projectId,
          employeeId: employeeId,
        },
        {
          status: updatePayload.status,
          validatedAt: new Date(),
          position: updatePayload?.position || null,
        },
      );
      Logger.log('applicants status updated', 'EmployeeProjectsService');
      await this.checkProjectCapacity(projectId);
      return {
        employeeId: employeeId,
        projectId: projectId,
        validatedAt: new Date(),
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Error during applicant status update',
        error.stack,
        'EmployeeProjectsService',
      );
      throw new InternalServerErrorException(
        'Failed to update applicant status',
      );
    }
  }

  async getApplicantsByProjectId(
    projectId: string,
  ): Promise<GetProjectApplicants[]> {
    try {
      const applicantsInfo = await this.employeeProjectRepository.find({
        where: { projectId: projectId, status: 'pending' },
        relations: [
          'employee',
          'employee.employeeSkillLink',
          'employee.employeeInterestLink',
        ],
      });
      const applicants = applicantsInfo.map((link) => ({
        employeeId: link.employeeId,
        email: link.employee.email,
        firstName: link.employee.firstName,
        lastName: link.employee.lastName,
        appliedAt: link.appliedAt,
        skillCount: link.employee.employeeSkillLink
          ? link.employee.employeeSkillLink.length
          : 0,
        interestCount: link.employee.employeeInterestLink
          ? link.employee.employeeInterestLink.length
          : 0,
      }));
      return applicants;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Error during applicants fetching',
        error.stack,
        'EmployeeProjectsService',
      );
      throw new InternalServerErrorException('Failed to fetch applicants');
    }
  }

  async getManagerNotFullProjects(
    employeeId: string,
  ): Promise<GetManagerNotFullProjectsResponseDto[]> {
    try {
      const projectsInfo = await this.employeeProjectRepository.find({
        where: { employeeId: employeeId, project: { full: false } },
        relations: ['project'],
        select: ['projectId'],
      });
      const projects = projectsInfo.map((pr) => ({
        projectId: pr.projectId,
        projectName: pr.project?.projectName,
      }));
      Logger.log(
        'Manager not full projects fetched',
        'EmployeeProjectsService',
      );
      return projects;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Error during manager not full projects fetching transaction',
        error.stack,
        'EmployeeProjectsService',
      );
      throw new InternalServerErrorException(
        'Failed to fetch manager not full projects',
      );
    }
  }

  async getManagerProjects(
    employeeId: string,
  ): Promise<GetEmployeeProjectsResponseDto> {
    try {
      const employeeProjects = await this.employeeProjectRepository.find({
        where: { employeeId: employeeId },
        relations: [
          'employee',
          'project',
          'project.projectTechnologyLink',
          'project.projectTechnologyLink.technology',
        ],
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
          client: employeeProjectsLink.project.client,
          progress: employeeProjectsLink.project.progress,
          startDate: employeeProjectsLink.project.startDate,
          endDate: employeeProjectsLink.project.endDate,
          active: employeeProjectsLink.project.active,
          technologies: employeeProjectsLink.project.projectTechnologyLink.map(
            (tech) => ({
              technologyId: tech.technologyId,
              technologyName: tech.technology.technologyName,
            }),
          ),
        }),
      );
      return {
        employeeProjects: projects,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Error during employee projects fetching transaction',
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
        chargeability: 0,
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
