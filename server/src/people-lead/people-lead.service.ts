import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { PeopleLeadEntity } from './entity/peopleLead.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PostPeopleLeadApplicationResponseDto } from './dto/response/postPeopleLeadApplication.response.dto';
import { EmployeeAssigned } from 'src/common/entities/employeeAssigned.entity';
import { GetPeopleLeadEmployeesResponseDto } from './dto/response/getPeopleLeadEmployees.response.dto';

@Injectable()
export class PeopleLeadService {
  constructor(
    @InjectRepository(PeopleLeadEntity)
    private peopleLeadRepository: Repository<PeopleLeadEntity>,

    @InjectRepository(EmployeeAssigned)
    private employeeAssignedRepository: Repository<EmployeeAssigned>,
  ) {}

  async postPeopleLeadApplication(
    empoyeeId: string,
  ): Promise<PostPeopleLeadApplicationResponseDto> {
    const registry: PeopleLeadEntity = {
      employeeId: empoyeeId,
      createdAt: new Date(),
      validationDate: new Date(),
      updatedAt: null,
      status: 'approved',
    };
    try {
      await this.peopleLeadRepository.save(registry);
      Logger.log('People Lead succesfully saved', 'PeopleLeadService');
      return {
        employeeId: empoyeeId,
        createdAt: new Date(),
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Unexpected error during people lead saving',
        error.stack,
        'PeopleLeadService',
      );
      throw new InternalServerErrorException('Failed to save people lead');
    }
  }

  async getPeopleLeadEmployees(
    peopleLeadId: string,
  ): Promise<GetPeopleLeadEmployeesResponseDto[]> {
    try {
      const employeeInfo = await this.employeeAssignedRepository.find({
        where: { peopleLeadId: peopleLeadId },
        select: ['employeeId'],
        relations: ['employee', 'employee.profilePicture'],
      });
      const employees = employeeInfo.map((link) => ({
        employeeId: link.employeeId,
        firstName: link.employee.firstName,
        lastName: link.employee.lastName,
        level: link.employee.level,
        profilePicture:
          link.employee.profilePicture?.imageData?.toString('base64') ||
          process.env.DEFAULT_PROFILE_IMAGE,
        mimeType: link.employee.profilePicture?.mimeType || null,
      }));
      Logger.log(
        'People Lead employees succesfully fetched',
        'PeopleLeadService',
      );
      return employees;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Unexpected error during people lead employee fetching',
        error.stack,
        'PeopleLeadService',
      );
      throw new InternalServerErrorException(
        'Failed to fetch people lead employees',
      );
    }
  }
}
