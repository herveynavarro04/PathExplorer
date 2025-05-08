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

@Injectable()
export class UserSkillsService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private dBHelperService: DatabaseHelperService,
  ) {}

  async getUserSkills(userId: string): Promise<SkillsResponseDto> {
    try {
      const user = await this.usersRepository.findOne({
        where: { userId },
        relations: ['skills'],
      });
      if (!user) {
        Logger.warn('User not found', 'UserSkillsService');
        throw new NotFoundException('User not found');
      }
      Logger.log('User skill fetched', 'UserSkillsService');
      const technicalSkills = user.skills
        .filter((skill) => skill.skillType === 'Tech')
        .map((skill) => ({
          skillName: skill.skillName,
          skillId: skill.skillId,
        }));

      const softSkills = user.skills
        .filter((skill) => skill.skillType === 'Soft')
        .map((skill) => ({
          skillName: skill.skillName,
          skillId: skill.skillId,
        }));
      return {
        technicalSkills: technicalSkills,
        softSkills: softSkills,
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
      addedSkills = await this.addUserSkills(userId, addSkills);
    }
    if (deleteSkills.length > 0) {
      deletedSkills = await this.deleteUserSkills(userId, deleteSkills);
    }
    return {
      addedSkills: addedSkills,
      deletedSkills: deletedSkills,
      lastUpdate: new Date(),
    };
  }

  private async addUserSkills(userId: string, addSkills: string[]) {
    try {
      const values = addSkills.map((skillId) => ({
        userid: userId,
        id_skill: skillId,
      }));
      await this.dBHelperService.insertMany('user_skills', values);
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

  private async deleteUserSkills(userId: string, deleteSkills: string[]) {
    try {
      await this.dBHelperService.deleteMany(
        'user_skills',
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
}
