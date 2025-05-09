import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserProjectsRequestDto } from '../dto/request/updateUserProjects.request.dto';
import { UpdateUserProjectsResponseDto } from '../dto/response/updateUserProjects.response.dto';
import { GetUserProjectsResponseDto } from '../dto/response/getUser.response.dto';
import { DatabaseHelperService } from 'src/common/helpers/dataBase.helper';
import { ProjectInfoPreviewResponseDto } from '../../projects/dto/response/projectInfoPreview.response.dto';

@Injectable()
export class UserProjectsService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private dBHelperService: DatabaseHelperService,
  ) {}

  async getUserAvailableProjects(
    userId: string,
  ): Promise<GetUserProjectsResponseDto> {
    try {
      const subscribedProjectIds = await this.getSubscribedProjectIds(userId);
      const availableProjects = await this.dBHelperService.selectMany(
        'project',
        { active: true, full: false },
        undefined,
        undefined,
        'projectId',
        subscribedProjectIds,
        ['projectId', 'projectName', 'information', 'active'],
      );
      Logger.log('User available projects fetched', 'UserProjectsService');
      const userProjects: ProjectInfoPreviewResponseDto[] =
        availableProjects.map((project) => ({
          projectId: project.projectId,
          projectName: project.projectName,
          information: project.information,
          active: project.active,
        }));
      return {
        projects: userProjects,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Error during available projects fetching',
        error.stack,
        'UserProjectsService',
      );
      throw new InternalServerErrorException(
        'Failed to fetch user available projects',
      );
    }
  }

  async getUserProjects(userId: string): Promise<GetUserProjectsResponseDto> {
    try {
      const user = await this.usersRepository.findOne({
        where: { userId },
        relations: ['projects'],
      });
      if (!user) {
        Logger.warn('User not found', 'UserProjectsService');
        throw new NotFoundException('User not found');
      }
      Logger.log('User projects fetched', 'UserProjectsService');
      const userProjects: ProjectInfoPreviewResponseDto[] = user.projects.map(
        (project) => ({
          projectId: project.projectId,
          projectName: project.projectName,
          information: project.information,
          active: project.active,
        }),
      );
      return {
        projects: userProjects,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Error during delete transaction',
        error.stack,
        'UserProjectsService',
      );
      throw new InternalServerErrorException('Failed to fetch user projects');
    }
  }

  async updateUserProjects(
    userId: string,
    updateProjectsPayload: UpdateUserProjectsRequestDto,
  ): Promise<UpdateUserProjectsResponseDto> {
    const addProjects = updateProjectsPayload.addProjects;
    const deleteProjects = updateProjectsPayload.deleteProjects;

    let addedProjects = [];
    let deletedProjects = [];

    if (addProjects.length > 0) {
      addedProjects = await this.addUserProjects(userId, addProjects);
    }
    if (deleteProjects.length > 0) {
      deletedProjects = await this.deleteUserProjects(userId, deleteProjects);
    }
    return {
      addedProjects: addedProjects,
      deletedProjects: deletedProjects,
      lastUpdate: new Date(),
    };
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
        'Error fetching subscribed project IDs for userId',
        error.stack,
        'UserProjectsService',
      );
      throw new InternalServerErrorException(
        'Failed to fetch subscribed project IDs',
      );
    }
  }

  private async addUserProjects(userId: string, addProjects: string[]) {
    try {
      const values = addProjects.map((projectId) => ({
        userid: userId,
        id_project: projectId,
        status: 'pending',
      }));
      await this.dBHelperService.insertMany('project_user', values);
      Logger.log('Projects successfully added to user!', 'UserProjectsService');
      return addProjects;
    } catch (error) {
      Logger.error(
        'Error adding projects to user',
        error.stack,
        'UserProjectsService',
      );
      throw new InternalServerErrorException('Failed to add projects to user');
    }
  }

  private async deleteUserProjects(userId: string, deleteProjects: string[]) {
    try {
      await this.dBHelperService.deleteMany(
        'project_user',
        { userid: userId },
        'id_project',
        deleteProjects,
      );
      Logger.log(
        'Projects successfully deleted from user!',
        'UserProjectsService',
      );
      return deleteProjects;
    } catch (error) {
      Logger.error(
        'Error deleting projects to user',
        error.stack,
        'UserProjectsService',
      );
      throw new InternalServerErrorException(
        'Failed to delete projects to user',
      );
    }
  }
}
