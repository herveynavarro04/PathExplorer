import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillsEntity } from '../entities/skills.entity';
import { DataSource, Repository } from 'typeorm';
import { SkillsResponseDto } from 'src/auth/dto/response/skills.response.dto';
import { UpdateUserSkillsResponseDto } from '../dto/response/postUserSkills.response.dto';
import { UpdateUserSkillsRequestDto } from '../dto/request/postUserSkills.request.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(SkillsEntity)
    private skillsRepository: Repository<SkillsEntity>,
    private dataSource: DataSource,
  ) {}

  async getSkills(): Promise<SkillsResponseDto> {
    try {
      const userSkills = await this.skillsRepository
        .createQueryBuilder('skills')
        .leftJoin('skills.user', 'user')
        .select(['skills.skillName', 'skills.skillType', 'skills.skillId'])
        .getMany();

      Logger.log('All skills successfully fetched!', 'SkillsService');
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
    } catch (error) {
      Logger.error(
        'Unexpected error during skills fetching!',
        error.stack,
        'SkillsService',
      );
      throw error;
    }
  }

  async getUserSkills(userId: string): Promise<SkillsResponseDto> {
    try {
      const userSkills = await this.skillsRepository
        .createQueryBuilder('skills')
        .leftJoin('skills.user', 'user')
        .where('user.userId = :userId', { userId })
        .select(['skills.skillName', 'skills.skillType', 'skills.skillId'])
        .getMany();

      Logger.log('User skills successfully fetched!', 'SkillsService');
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
    } catch (error) {
      Logger.error(
        'Unexpected error during user skills fetching!',
        error.stack,
        'SkillsService',
      );
      throw error;
    }
  }

  async postUserSkills(
    userId: string,
    postSkillsPayload: UpdateUserSkillsRequestDto,
  ): Promise<UpdateUserSkillsResponseDto> {
    try {
      const values = postSkillsPayload.skills.map((skillId) => ({
        userid: userId,
        id_skill: skillId,
      }));

      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into('user_skills')
        .values(values)
        .orIgnore()
        .execute();
      Logger.log('User skills successfully updated!', 'SkillsService');
      return {
        userId: userId,
        lastUpdate: new Date(),
      };
    } catch (error) {
      Logger.error(
        'Unexpected error during user skills update!',
        error.stack,
        'SkillsService',
      );
      throw error;
    }
  }

  async deleteUserSkills(
    userId: string,
    postSkillsPayload: UpdateUserSkillsRequestDto,
  ): Promise<UpdateUserSkillsResponseDto> {
    try {
      const skillIds = postSkillsPayload.skills;

      await this.dataSource
        .createQueryBuilder()
        .delete()
        .from('user_skills')
        .where('userid = :userId', { userId })
        .andWhere('id_skill IN (:...skillIds)', { skillIds })
        .execute();
      Logger.log('User skills successfully updated!', 'SkillsService');
      return {
        userId: userId,
        lastUpdate: new Date(),
      };
    } catch (error) {
      Logger.error(
        'Unexpected error during user skills update!',
        error.stack,
        'SkillsService',
      );
      throw error;
    }
  }
}
