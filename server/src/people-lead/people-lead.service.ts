import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeAssigned } from 'src/common/entities/employeeAssigned.entity';
import { Repository } from 'typeorm';
import { UpdatePeopleLeadApplicationStatusRequestDto } from './dto/request/updatePeopleLeadApplicationStatus.request.dto';
import { GetPeopleLeadApplicants } from './dto/response/getPeopleLeadApplicants.response.dto';
import { GetPeopleLeadEmployeesResponseDto } from './dto/response/getPeopleLeadEmployees.response.dto';
import { PostPeopleLeadApplicationResponseDto } from './dto/response/postPeopleLeadApplication.response.dto';
import { UpdatePeopleLeadApplicationStatusResponseDto } from './dto/response/updatePeopleLeadApplicationStatus.response.dto';
import { PeopleLeadEntity } from './entity/peopleLead.entity';

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
      validationDate: null,
      updatedAt: null,
      status: 'pending',
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

  private async assignEmployees(
    peopleLeadId: string,
    employeeArray: string[],
  ): Promise<void> {
    try {
      const register = employeeArray.map((employeeId) => ({
        employeeId: employeeId,
        peopleLeadId: peopleLeadId,
        createdAt: new Date(),
      }));
      Logger.log(
        'People Lead employees succesfully assigned',
        'PeopleLeadService',
      );
      await this.employeeAssignedRepository.save(register);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Unexpected error during people lead employee assigning',
        error.stack,
        'PeopleLeadService',
      );
      throw new InternalServerErrorException(
        'Failed to assign people lead employees',
      );
    }
  }

  async updatePeopleLeadApplicationStatus(
    employeeId: string,
    updatePayload: UpdatePeopleLeadApplicationStatusRequestDto,
  ): Promise<UpdatePeopleLeadApplicationStatusResponseDto> {
    try {
      await this.peopleLeadRepository.update(
        {
          employeeId: employeeId,
        },
        {
          status: updatePayload.status,
          validationDate: new Date(),
          updatedAt: new Date(),
        },
      );
      Logger.log(
        'People Lead applicant succesfully updated',
        'PeopleLeadService',
      );
      if (updatePayload.employeesAssigned) {
        this.assignEmployees(employeeId, updatePayload.employeesAssigned);
      }
      return {
        employeeId: employeeId,
        updatedAt: new Date(),
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Unexpected error during people lead applicant updating',
        error.stack,
        'PeopleLeadService',
      );
      throw new InternalServerErrorException(
        'Failed to update people lead applicant',
      );
    }
  }

  async getPeopleLeadApplicants(): Promise<GetPeopleLeadApplicants[]> {
    try {
      const applicantInfo = await this.peopleLeadRepository.find({
        where: { status: 'pending' },
        relations: ['employee', 'employee.employeeSkillLink'],
      });
      const applicant = applicantInfo.map((link) => ({
        employeeId: link.employeeId,
        email: link.employee.email,
        firstName: link.employee.firstName,
        lastName: link.employee.lastName,
        appliedAt: link.createdAt,
        skillCount: link.employee.employeeSkillLink
          ? link.employee.employeeSkillLink.length
          : 0,
        interestCount: link.employee.employeeInterestLink
          ? link.employee.employeeInterestLink.length
          : 0,
      }));
      Logger.log(
        'People Lead applicants succesfully fetched',
        'PeopleLeadService',
      );
      return applicant;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Unexpected error during people lead applicants fetching',
        error.stack,
        'PeopleLeadService',
      );
      throw new InternalServerErrorException(
        'Failed to fetch people lead applicants',
      );
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
