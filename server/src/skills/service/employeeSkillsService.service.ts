import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeInterestEntity } from 'src/common/entities/employeeInterests.entity';
import { EmployeeSkillEntity } from 'src/common/entities/employeeSkills.entity';
import { SkillsResponseDto } from 'src/skills/dto/response/skills.response.dto';
import { SkillsEntity } from 'src/skills/entities/skills.entity';
import { Repository, In } from 'typeorm';
import { UpdateEmployeeSkillsRequestDto } from '../dto/request/updateEmployeeSkills.request.dto';
import { UpdateEmployeeSkillsResponseDto } from '../dto/response/updateEmployeeSkills.response.dto';

@Injectable()
export class EmployeeSkillsService {
  constructor(
    @InjectRepository(EmployeeSkillEntity)
    private employeeSkillsRepository: Repository<EmployeeSkillEntity>,
    @InjectRepository(EmployeeInterestEntity)
    private employeeInterestsRepository: Repository<EmployeeInterestEntity>,
  ) {}

  async getEmployeeSkills(employeeId: string): Promise<SkillsResponseDto> {
    try {
      const employeeSkills = await this.employeeSkillsRepository.find({
        where: { employeeId: employeeId },
        relations: ['employee', 'skill'],
      });
      if (!employeeSkills) {
        Logger.warn('Employee skills not found', 'EmployeeSkillsService');
        throw new NotFoundException('Employee skills not found');
      }
      Logger.log('Employee skill fetched', 'EmployeeSkillsService');
      const skills: SkillsEntity[] = employeeSkills.map(
        (employeeSkillsLink) => ({
          skillId: employeeSkillsLink.skillId,
          skillName: employeeSkillsLink.skill.skillName,
          skillType: employeeSkillsLink.skill.skillType,
          createdAt: employeeSkillsLink.createdAt,
        }),
      );
      const filterSkills = await this.filterEmployeeSkills(skills);
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
        'EmployeeSkillsService',
      );
      throw new InternalServerErrorException('Failed to delete employee');
    }
  }

  async updateEmployeeSkills(
    employeeId: string,
    updateSkillsPayload: UpdateEmployeeSkillsRequestDto,
  ): Promise<UpdateEmployeeSkillsResponseDto> {
    const addSkills = updateSkillsPayload.addSkills;
    const deleteSkills = updateSkillsPayload.deleteSkills;

    let addedSkills = [];
    let deletedSkills = [];

    if (addSkills) {
      addedSkills = await this.addEmployeeSkills(employeeId, addSkills);
    }
    if (deleteSkills) {
      deletedSkills = await this.deleteEmployeeSkills(employeeId, deleteSkills);
    }
    return {
      addedSkills: addedSkills,
      deletedSkills: deletedSkills,
      lastUpdate: new Date(),
    };
  }

  async getEmployeeSkillsInterests(
    employeeId: string,
  ): Promise<SkillsResponseDto> {
    try {
      const employeeInterests = await this.employeeInterestsRepository.find({
        where: { employeeId: employeeId },
        relations: ['employee', 'skill'],
      });
      if (!employeeInterests) {
        Logger.warn('Employee interests not found', 'EmployeeSkillsService');
        throw new NotFoundException('Employee interest not found');
      }
      Logger.log('Employee interests fetched', 'EmployeeSkillsService');
      const interests: SkillsEntity[] = employeeInterests.map(
        (interestLink) => ({
          skillId: interestLink.skillId,
          skillName: interestLink.skill.skillName,
          skillType: interestLink.skill.skillType,
          createdAt: interestLink.createdAt,
        }),
      );
      const filterSkills = await this.filterEmployeeSkills(interests);
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
        'EmployeeSkillsService',
      );
      throw new InternalServerErrorException(
        'Failed to fetch employee interests',
      );
    }
  }

  async updateEmployeeSkillsInterests(
    employeeId: string,
    updateSkillsPayload: UpdateEmployeeSkillsRequestDto,
  ): Promise<UpdateEmployeeSkillsResponseDto> {
    const addSkills = updateSkillsPayload.addSkills;
    const deleteSkills = updateSkillsPayload.deleteSkills;

    let addedSkills = [];
    let deletedSkills = [];

    if (addSkills.length > 0) {
      addedSkills = await this.addEmployeeSkills(employeeId, addSkills);
    }
    if (deleteSkills.length > 0) {
      deletedSkills = await this.deleteEmployeeSkills(employeeId, deleteSkills);
    }
    return {
      addedSkills: addedSkills,
      deletedSkills: deletedSkills,
      lastUpdate: new Date(),
    };
  }

  private async addEmployeeSkills(
    employeeId: string,
    addSkills: string[],
  ): Promise<string[]> {
    try {
      const employeeSkills = addSkills.map((skillId) => ({
        employeeId: employeeId,
        skillId: skillId,
        createdAt: new Date(),
      }));
      await this.employeeSkillsRepository.save(employeeSkills);
      Logger.log(
        'Skills successfully added to employee!',
        'EmployeeSkillsService',
      );
      return addSkills;
    } catch (error) {
      Logger.error(
        'Error adding skills to employee',
        error.stack,
        'EmployeeSkillsService',
      );
      throw new InternalServerErrorException(
        'Failed to add skills to employee',
      );
    }
  }

  private async deleteEmployeeSkills(
    employeeId: string,
    deleteSkills: string[],
  ): Promise<string[]> {
    try {
      await this.employeeSkillsRepository.delete({
        employeeId: employeeId,
        skillId: In(deleteSkills),
      });
      Logger.log(
        'Skills successfully deleted from employee!',
        'EmployeeSkillsService',
      );
      return deleteSkills;
    } catch (error) {
      Logger.error(
        'Error deleting skills to employee',
        error.stack,
        'EmployeeSkillsService',
      );
      throw new InternalServerErrorException(
        'Failed to delete skills to employee',
      );
    }
  }

  private async filterEmployeeSkills(
    employeeSkills: SkillsEntity[],
  ): Promise<SkillsResponseDto> {
    const technicalSkills = employeeSkills
      .filter((skill) => skill.skillType === 'Tech')
      .map((skill) => ({
        skillName: skill.skillName,
        skillId: skill.skillId,
      }));

    const softSkills = employeeSkills
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
