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

@Injectable()
export class UserProjectsService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private dBHelperService: DatabaseHelperService,
  ) {}

  async getUserProjects(userId: string): Promise<GetUserProjectsResponseDto> {
    try {
      const user = await this.usersRepository.findOne({
        where: { userId },
        relations: ['projects'],
      });
      if (!user) {
        Logger.warn('User not found', 'UserService');
        throw new NotFoundException('User not found');
      }
      Logger.log('User projects fetched', 'UserService');
      return {
        projects: user.projects,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Error during delete transaction',
        error.stack,
        'UserService',
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
