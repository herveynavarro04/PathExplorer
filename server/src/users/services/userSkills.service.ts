import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { SkillsResponseDto } from 'src/skills/dto/response/skills.response.dto';
import { UpdateUserSkillsRequestDto } from '../dto/request/postUserSkills.request.dto';
import { UpdateUserSkillsResponseDto } from '../dto/response/postUserSkills.response.dto';
import { DatabaseHelperService } from 'src/common/helpers/dataBase.helper';
import { SkillsEntity } from 'src/skills/entities/skills.entity';

@Injectable()
export class UserSkillsService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private dBHelperService: DatabaseHelperService,
  ) {}

  async getUserSkills(userId: string): Promise<SkillsResponseDto> {
    try {
      const user = await this.userRepository.findOne({
        where: { userId },
        relations: ['skills'],
      });
      if (!user) {
        Logger.warn('User not found', 'UserSkillsService');
        throw new NotFoundException('User not found');
      }
      Logger.log('User skill fetched', 'UserSkillsService');
      const filterSkills = await this.filterUserSkills(user.skills);
      return {
        technicalSkills: filterSkills.technicalSkills,
        softSkills: filterSkills.softSkills,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Error during delete transaction',
        error.stack,
        'UserSkillsService',
      );
      throw new InternalServerErrorException('Failed to delete user');
    }
  }

  async updateUserSkills(
    userId: string,
    updateSkillsPayload: UpdateUserSkillsRequestDto,
  ): Promise<UpdateUserSkillsResponseDto> {
    const addSkills = updateSkillsPayload.addSkills;
    const deleteSkills = updateSkillsPayload.deleteSkills;

    let addedSkills = [];
    let deletedSkills = [];

    if (addSkills.length > 0) {
      addedSkills = await this.addUserSkills('user_skills', userId, addSkills);
    }
    if (deleteSkills.length > 0) {
      deletedSkills = await this.deleteUserSkills(
        'user_skills',
        userId,
        deleteSkills,
      );
    }
    return {
      addedSkills: addedSkills,
      deletedSkills: deletedSkills,
      lastUpdate: new Date(),
    };
  }

  async getUserSkillsInterests(userId: string): Promise<SkillsResponseDto> {
    try {
      const user = await this.userRepository.findOne({
        where: { userId },
        relations: ['interests'],
      });
      if (!user) {
        Logger.warn('User not found', 'UserInterestsService');
        throw new NotFoundException('User not found');
      }
      Logger.log('User interests fetched', 'UserInterestsService');
      const filterSkills = await this.filterUserSkills(user.interests);
      return {
        technicalSkills: filterSkills.technicalSkills,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Error during interests fetching',
        error.stack,
        'UserInterestsService',
      );
      throw new InternalServerErrorException('Failed to fetch user intersts');
    }
  }

  async updateUserSkillsInterests(
    userId: string,
    updateSkillsPayload: UpdateUserSkillsRequestDto,
  ): Promise<UpdateUserSkillsResponseDto> {
    const addSkills = updateSkillsPayload.addSkills;
    const deleteSkills = updateSkillsPayload.deleteSkills;

    let addedSkills = [];
    let deletedSkills = [];

    if (addSkills.length > 0) {
      addedSkills = await this.addUserSkills(
        'user_interests',
        userId,
        addSkills,
      );
    }
    if (deleteSkills.length > 0) {
      deletedSkills = await this.deleteUserSkills(
        'user_interests',
        userId,
        deleteSkills,
      );
    }
    return {
      addedSkills: addedSkills,
      deletedSkills: deletedSkills,
      lastUpdate: new Date(),
    };
  }

  private async addUserSkills(
    tableName: string,
    userId: string,
    addSkills: string[],
  ): Promise<string[]> {
    try {
      const values = addSkills.map((skillId) => ({
        userid: userId,
        id_skill: skillId,
      }));
      await this.dBHelperService.insertMany(tableName, values);
      Logger.log('Skills successfully added to user!', 'UserSkillsService');
      return addSkills;
    } catch (error) {
      Logger.error(
        'Error adding skills to user',
        error.stack,
        'UserSkillsService',
      );
      throw new InternalServerErrorException('Failed to add skills to user');
    }
  }

  private async deleteUserSkills(
    tableName: string,
    userId: string,
    deleteSkills: string[],
  ): Promise<string[]> {
    try {
      await this.dBHelperService.deleteMany(
        tableName,
        { userid: userId },
        'id_skill',
        deleteSkills,
      );
      Logger.log('Skills successfully deleted from user!', 'UserSkillsService');
      return deleteSkills;
    } catch (error) {
      Logger.error(
        'Error deleting skills to user',
        error.stack,
        'UserSkillsService',
      );
      throw new InternalServerErrorException('Failed to delete skills to user');
    }
  }

  private async filterUserSkills(
    userSkills: SkillsEntity[],
  ): Promise<SkillsResponseDto> {
    const technicalSkills = userSkills
      .filter((skill) => skill.skillType === 'Tech')
      .map((skill) => ({
        skillName: skill.skillName,
        skillId: skill.skillId,
      }));

    const softSkills = userSkills
      .filter((skill) => skill.skillType === 'Soft')
      .map((skill) => ({
        skillName: skill.skillName,
        skillId: skill.skillId,
      }));

    return {
      technicalSkills: technicalSkills,
      softSkills: softSkills,
    };
  }
}
