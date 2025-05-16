import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SkillsResponseDto } from 'src/skills/dto/response/skills.response.dto';
import { SkillsEntity } from '../entities/skills.entity';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(SkillsEntity)
    private skillsRepository: Repository<SkillsEntity>,
  ) {}

  async getSkills(): Promise<SkillsResponseDto> {
    try {
      const skills = await this.skillsRepository.find();
      Logger.log('All skills successfully fetched!', 'SkillsService');
      const technicalSkills = skills
        .filter((skill) => skill.skillType === 'Tech')
        .map((skill) => ({
          skillName: skill.skillName,
          skillId: skill.skillId,
        }));

      const softSkills = skills
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
}
