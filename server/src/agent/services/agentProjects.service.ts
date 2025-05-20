import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ProjectRecomendationsResponseDto } from '../dto/response/projectRecomendations.response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeSkillEntity } from 'src/common/entities/employeeSkills.entity';
import { In, Not, Repository } from 'typeorm';
import { EmployeeInterestEntity } from 'src/common/entities/employeeInterests.entity';
import { EmployeeProjectEntity } from 'src/common/entities/employeeProject.entity';
import { ProjectRecomendationsRequestDto } from '../dto/request/projectRecomendations.request.dto';
import { IEmployeeInfo } from '../interfaces/employeeInfo.interface';
import { AgentRepository } from '../repository/agent.repository';
import { ProjectsEntity } from 'src/projects/entities/projects.entity';

@Injectable()
export class AgentService {
  constructor(
    private agentRepository: AgentRepository,
    @InjectRepository(EmployeeSkillEntity)
    private employeeSkillsRepository: Repository<EmployeeSkillEntity>,
    @InjectRepository(EmployeeInterestEntity)
    private employeeInterestsRepository: Repository<EmployeeInterestEntity>,
    @InjectRepository(EmployeeProjectEntity)
    private employeeProjectsRepository: Repository<EmployeeProjectEntity>,
    @InjectRepository(ProjectsEntity)
    private projectsRepository: Repository<ProjectsEntity>,
  ) {}

  async agentProjectRecomendations(
    employeeId: string,
  ): Promise<ProjectRecomendationsResponseDto> {
    const skills = await this.getEmployeeSkills(employeeId);
    const interests = await this.getEmployeeInterests(employeeId);
    const pastProjects = await this.getEmployeeProjects(employeeId);
    const availableProjects = await this.getAvailableProjects(pastProjects);

    const employeeInfo: IEmployeeInfo = {
      skills: skills,
      interests: interests,
      pastProjects: pastProjects,
    };

    const payload: ProjectRecomendationsRequestDto = {
      employeeInfo: employeeInfo,
      availableProjects: availableProjects,
    };

    return this.agentRepository.agentProjectRecomendations(payload);
  }

  private async getEmployeeSkills(employeeId: string): Promise<string[]> {
    try {
      const skillIds = await this.employeeSkillsRepository.find({
        where: { employeeId: employeeId },
        select: ['skillId'],
        relations: ['employeeSkillLink', 'employeeSkillLink.skill'],
      });
      const skills = skillIds.map(
        (employeeSkillLink) => employeeSkillLink.skill.skillName,
      );
      Logger.log('Employee skills successfully fetched', 'AgentAgentService');
      return skills;
    } catch (error) {
      Logger.error(
        'Error during skills fetching',
        error.stack,
        'AgentAgentService',
      );
      throw new InternalServerErrorException('Failed to fetch employee skills');
    }
  }

  private async getEmployeeInterests(employeeId: string): Promise<string[]> {
    try {
      const skillIds = await this.employeeInterestsRepository.find({
        where: { employeeId: employeeId },
        select: ['skillId'],
        relations: ['employeeSkillLink', 'employeeSkillLink.skill'],
      });
      const skills = skillIds.map(
        (employeeSkillLink) => employeeSkillLink.skill.skillName,
      );
      Logger.log(
        'Employee interests successfully fetched',
        'AgentAgentService',
      );
      return skills;
    } catch (error) {
      Logger.error(
        'Error during interests fetching',
        error.stack,
        'AgentAgentService',
      );
      throw new InternalServerErrorException(
        'Failed to fetch employee interests',
      );
    }
  }

  private async getAvailableProjects(pastProjects: string[]): Promise<object> {
    try {
      const projects = await this.projectsRepository.find({
        where: {
          active: true,
          full: false,
          projectId: Not(In(pastProjects)),
        },
        relations: [
          'projectTechnologyLink',
          'projectTechnologyLink.technology',
        ],
        select: ['projectId', 'projectName', 'information'],
      });

      const userProjects = projects.map((project) => ({
        projectId: project.projectId,
        information: project.information,
        technologies: project.projectTechnologyLink.map((tech) => ({
          technologyId: tech.technologyId,
          technologyName: tech.technology.technologyName,
        })),
      }));
      Logger.log('Available projects fetched!', 'AgentService');
      return userProjects;
    } catch (error) {
      Logger.error(
        'Error fetching available projects',
        error.stack,
        'AgentService',
      );
      throw new InternalServerErrorException(
        'Failed to fetch available projects',
      );
    }
  }
  private async getEmployeeProjects(employeeId: string): Promise<string[]> {
    try {
      const projectIds = await this.employeeProjectsRepository.find({
        where: { employeeId: employeeId },
        select: ['projectId'],
        relations: ['employeeProjectLink', 'employeeProjectLink.project'],
      });
      const projects = projectIds.map((link) => link.project.information);
      Logger.log('Employee projects successfully fetched', 'AgentAgentService');
      return projects;
    } catch (error) {
      Logger.error(
        'Error during projects fetching',
        error.stack,
        'AgentAgentService',
      );
      throw new InternalServerErrorException(
        'Failed to fetch employee projects',
      );
    }
  }
}
