import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeProjectEntity } from 'src/common/entities/employeeProject.entity';
import { HashingService } from 'src/Utilities/hashing.utilities';
import { ImageService } from 'src/Utilities/imageService.utilities';
import { Repository } from 'typeorm';
import { RegisterRequestDto } from './dto/request/register.request.dto';
import { UpdateEmployeeRequestDto } from './dto/request/updateEmployee.request.dto';
import { UpdateEmployeeStatusRequestDto } from './dto/request/updateEmployeeStatus.request.dto';
import { DeleteEmployeeResponseDto } from './dto/response/deleteEmployee.response.dto';
import { GetAllEmployeesResponseDto } from './dto/response/getAllEmployees.response.dto';
import { FindEmployeebyEmailResponseDto } from './dto/response/getEmployeeByEmail.response.dto';
import { GetEmployeeInfoResponseDto } from './dto/response/getEmployeeInfo.response.dto';
import { GetEmployeesListResponseDto } from './dto/response/getEmployeesList.response.dto';
import { RegisterResponseDto } from './dto/response/register.response.dto';
import { UpdateEmployeeResponseDto } from './dto/response/updateEmployee.response.dto';
import { UpdateEmployeeStatusResponseDto } from './dto/response/updateEmployeeStatus.response.dto';
import { EmployeeEntity } from './entities/employee.entity';
import { EmployeeProfilePicture } from './entities/employeeProfilePicture.entity';

@Injectable()
export class EmployeeService {
  constructor(
    private hashingService: HashingService,
    private imageService: ImageService,
    @InjectRepository(EmployeeEntity)
    private employeesRepository: Repository<EmployeeEntity>,
    @InjectRepository(EmployeeProjectEntity)
    private employeeProjects: Repository<EmployeeProjectEntity>,
    @InjectRepository(EmployeeProfilePicture)
    private employeeProfilePicturesRepository: Repository<EmployeeProfilePicture>,
  ) {}

  async registerEmployee(
    register: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    try {
      await this.employeesRepository.save(register);
      Logger.log('Employee created succesfully', 'EmployeeService');
      return {
        employeeId: register.employeeId,
      };
    } catch (error) {
      Logger.error(
        'Error during employee registration',
        error.stack,
        'EmployeeService',
      );
      throw new InternalServerErrorException('Failed to create employee');
    }
  }

  async checkIfPeopleLead(employeeId: string): Promise<boolean> {
    try {
      const employeeInfo = await this.employeesRepository.findOne({
        where: { employeeId: employeeId },
        relations: ['employeeAssigned'],
      });
      Logger.log('PeopleLead verification', 'EmployeeService');
      if (employeeInfo.employeeAssigned.length > 0) {
        return true;
      }
      return false;
    } catch (error) {
      Logger.error(
        'Error during peopleLead verification',
        error.stack,
        'EmployeeService',
      );
      throw new InternalServerErrorException('Failed to verify peopleLead');
    }
  }

  async updateEmployeeStatus(
    employeeId: string,
    updatePayload: UpdateEmployeeStatusRequestDto,
  ): Promise<UpdateEmployeeStatusResponseDto> {
    try {
      await this.employeesRepository.update(
        {
          employeeId: employeeId,
        },
        {
          active: updatePayload.status,
          updatedAt: new Date(),
        },
      );
      Logger.log('Employee status succesfully updated!', 'EmployeeService');
      return {
        employeeId: employeeId,
        updatedAt: new Date(),
      };
    } catch (error) {
      Logger.error(
        'Error during employee status update',
        error.stack,
        'EmployeeService',
      );
      throw new InternalServerErrorException(
        'Failed to update employee status',
      );
    }
  }

  async getAllEmployees(): Promise<GetAllEmployeesResponseDto[]> {
    try {
      const employeesInfo = await this.employeesRepository.find({
        select: [
          'employeeId',
          'firstName',
          'lastName',
          'level',
          'email',
          'rol',
          'active',
        ],
      });
      const employees = employeesInfo.map((link) => ({
        employeeId: link.employeeId,
        firstName: link.firstName,
        lastName: link.lastName,
        level: link.level,
        email: link.email,
        rol: link.rol,
        active: link.active,
      }));
      Logger.log('All employees succesfully fetched', 'EmployeeService');
      return employees;
    } catch (error) {
      Logger.error(
        'Error during employees fetching',
        error.stack,
        'EmployeeService',
      );
      throw new InternalServerErrorException('Failed to fetch all employees');
    }
  }

  async getAvailableEmployees(
    employeeId: string,
  ): Promise<GetEmployeesListResponseDto> {
    try {
      const managerEmployees = await this.employeesRepository
        .createQueryBuilder('employee')
        .leftJoin('employee.employeeInterestLink', 'interest')
        .leftJoin('employee.employeeSkillLink', 'skill')
        .where('employee.employeeId != :employeeId', { employeeId })
        .andWhere('employee.active = true')
        .andWhere((qb) => {
          const subQuery = qb
            .subQuery()
            .select('1')
            .from('employee_project', 'ep')
            .where('ep.employee_id = employee.employeeId')
            .andWhere('ep.status = :approvedStatus')
            .getQuery();
          return `NOT EXISTS ${subQuery}`;
        })
        .setParameter('approvedStatus', 'approved')
        .select([
          'employee.employeeId AS "employeeId"',
          'employee.email AS email',
          'employee.firstName AS "firstName"',
          'employee.lastName AS "lastName"',
          'COUNT(DISTINCT interest.skillId) AS "interestCount"',
          'COUNT(DISTINCT skill.skillId) AS "skillCount"',
        ])
        .groupBy(
          'employee.employeeId, employee.email, employee.firstName, employee.lastName',
        )
        .getRawMany();

      const employees = managerEmployees.map((emp) => ({
        ...emp,
        interestCount: Number(emp.interestCount),
        skillCount: Number(emp.skillCount),
      }));
      Logger.log('Available employees found', 'EmployeeService');
      return {
        employees: employees,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Unexpected error during available employees fetching',
        error.stack,
        'EmployeeService',
      );
      throw new InternalServerErrorException(
        'Failed to validate available employees',
      );
    }
  }

  async verifyEmployeeExistance(email: string): Promise<boolean> {
    try {
      const employee = await this.employeesRepository.exists({
        where: { email },
      });
      Logger.log('employee exists');
      return employee;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Error during employee verification',
        error.stack,
        'EmployeeService',
      );
      throw new InternalServerErrorException('Failed to verify employee');
    }
  }

  async findEmployeebyEmail(
    email: string,
  ): Promise<FindEmployeebyEmailResponseDto> {
    try {
      const employee = await this.employeesRepository.findOne({
        where: { email },
      });
      if (!employee) {
        Logger.warn('Employee not found', 'EmployeeService');
        throw new NotFoundException('employee not found');
      }
      Logger.log('employee found', 'EmployeeService');
      return employee;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Unexpected error during employee validation',
        error.stack,
        'EmployeeService',
      );
      throw new InternalServerErrorException('Failed to validate employee');
    }
  }

  async getManagerEmployees(
    employeeId: string,
  ): Promise<GetEmployeesListResponseDto> {
    const managerProjects = await this.getManagerProjects(employeeId);
    if (managerProjects.length < 1) {
      return null;
    }
    try {
      const managerEmployees = await this.employeeProjects
        .createQueryBuilder('ep')
        .innerJoin('ep.project', 'project')
        .innerJoin('ep.employee', 'employee')
        .leftJoin('employee.employeeInterestLink', 'interest')
        .leftJoin('employee.employeeSkillLink', 'skill')
        .where('ep.projectId IN (:...projectIds)', {
          projectIds: managerProjects,
        })
        .andWhere('ep.employeeId != :employeeId', { employeeId })
        .andWhere('ep.status = :status', { status: 'approved' })
        .select([
          'employee.employeeId AS "employeeId"',
          'employee.email AS email',
          'employee.firstName AS "firstName"',
          'employee.lastName AS "lastName"',
          'ep.chargeability AS "chargeability"',
          'ep.position AS position',
          'COUNT(DISTINCT interest.skillId) AS "interestCount"',
          'COUNT(DISTINCT skill.skillId) AS "skillCount"',
        ])
        .groupBy(
          'employee.employeeId, employee.email, employee.firstName, employee.lastName, ep.chargeability, ep.position',
        )
        .getRawMany();
      const employees = managerEmployees.map((emp) => ({
        ...emp,
        interestCount: Number(emp.interestCount),
        skillCount: Number(emp.skillCount),
      }));
      Logger.log('Manager employees found', 'EmployeeService');
      return {
        employees: employees,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Unexpected error during manager employees fetching',
        error.stack,
        'EmployeeService',
      );
      throw new InternalServerErrorException(
        'Failed to validate manager employees',
      );
    }
  }

  private async getManagerProjects(employeeId: string): Promise<string[]> {
    try {
      const projects = await this.employeeProjects
        .createQueryBuilder('ep')
        .innerJoin('ep.project', 'project')
        .where('ep.employeeId = :employeeId', { employeeId })
        .andWhere('project.active = :projectActive', {
          projectActive: true,
        })
        .select(['ep.projectId'])
        .getMany();

      const managerProjects = projects.map((project) => project.projectId);
      Logger.log('Manager projects found', 'EmployeeService');
      return managerProjects;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Unexpected error during manager projects fetching',
        error.stack,
        'EmployeeService',
      );
      throw new InternalServerErrorException(
        'Failed to validate manager projects',
      );
    }
  }

  async getEmployeeInfo(
    employeeId: string,
  ): Promise<GetEmployeeInfoResponseDto> {
    try {
      const employeeInfo = await this.employeesRepository.findOne({
        where: { employeeId },
        relations: [
          'profilePicture',
          'employeeProjectLink',
          'employeeProjectLink.project',
        ],
      });
      if (!employeeInfo) {
        Logger.warn('Employee not found', 'EmployeeService');
        throw new NotFoundException('employee not found');
      }

      const result = {
        email: employeeInfo.email,
        firstName: employeeInfo.firstName,
        lastName: employeeInfo.lastName,
        level: employeeInfo.level,
        chargeability:
          employeeInfo.employeeProjectLink.find(
            (link) => link.status === 'approved',
          )?.chargeability || null,
        position:
          employeeInfo.employeeProjectLink.find(
            (link) => link.status === 'approved',
          )?.position || null,
        profilePicture:
          employeeInfo?.profilePicture?.imageData?.toString('base64') ||
          process.env.DEFAULT_PROFILE_IMAGE,
        mimeType: employeeInfo?.profilePicture?.mimeType || null,
      };
      Logger.log('employee found', 'EmployeeService');
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Error during employee info fetching',
        error.stack,
        'EmployeeService',
      );
      throw new InternalServerErrorException('Failed to get employee info');
    }
  }

  async deleteProfilePicture(
    employeeId: string,
  ): Promise<DeleteEmployeeResponseDto> {
    try {
      await this.employeeProfilePicturesRepository.update(
        { employee: { employeeId: employeeId } },
        {
          imageData: null,
          mimeType: null,
          uploadedAt: null,
        },
      );
      Logger.log('Employee profile picture deleted', 'EmployeeService');
      return {
        employeeId: employeeId,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Error during profile picture update transaction',
        error.stack,
        'EmployeeService',
      );
      throw new InternalServerErrorException(
        'Failed to delete employee profile picture',
      );
    }
  }

  async updateEmployee(
    employeeId: string,
    updatePayload: UpdateEmployeeRequestDto,
    file: Express.Multer.File | undefined,
  ): Promise<UpdateEmployeeResponseDto> {
    if (!file && !updatePayload.password) {
      return null;
    }
    if (updatePayload.password) {
      const newPassword = await this.hashingService.hashPassword(
        updatePayload.password,
      );
      this.updatePassword(newPassword, employeeId);
    }
    if (file) {
      this.imageService.validateMimeType(file);
      const imageBuffer = file.buffer;
      const imageMimeType = file.mimetype;
      this.updateProfilePicture(employeeId, imageBuffer, imageMimeType);
    }
    return {
      employeeId: employeeId,
      lastUpdate: new Date(),
    };
  }

  private async updateProfilePicture(
    employeeId: string,
    imageBuffer: Buffer,
    imageMimeType: string,
  ): Promise<void> {
    try {
      const compressImage = await this.imageService.compressImage(imageBuffer);
      await this.employeeProfilePicturesRepository.update(
        { employee: { employeeId: employeeId } },
        {
          imageData: compressImage,
          mimeType: imageMimeType,
          uploadedAt: new Date(),
        },
      );
      Logger.log('Employee profile picture updated', 'EmployeeService');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Error during profile picture update transaction',
        error.stack,
        'EmployeeService',
      );
      throw new InternalServerErrorException(
        'Failed to updated employee profile picture',
      );
    }
  }

  private async updatePassword(
    newPassword: string,
    employeeId: string,
  ): Promise<void> {
    try {
      await this.employeesRepository.update(
        { employeeId: employeeId },
        { password: newPassword, updatedAt: new Date() },
      );
      Logger.log('Employee password updated', 'EmployeeService');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Error during password update transaction',
        error.stack,
        'EmployeeService',
      );
      throw new InternalServerErrorException(
        'Failed to updated employee password',
      );
    }
  }

  async deleteEmployee(employeeId: string): Promise<DeleteEmployeeResponseDto> {
    try {
      const deleteResult = await this.employeesRepository.delete({
        employeeId,
      });
      if (deleteResult.affected === 0) {
        Logger.warn('Employee not found', 'EmployeeService');
        throw new NotFoundException(`employee not found`);
      }
      Logger.log('Employee deleted successfully');
      return {
        employeeId: employeeId,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Error during delete transaction',
        error.stack,
        'EmployeeService',
      );
      throw new InternalServerErrorException('Failed to delete employee');
    }
  }
}
