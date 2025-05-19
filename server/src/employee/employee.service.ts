import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashingService } from 'src/Utilities/hashing.utilities';
import { RegisterRequestDto } from '../dto/request/register.request.dto';
import { RegisterResponseDto } from '../dto/response/register.response.dto';
import { EmployeeEntity } from '../entities/employee.entity';
import { FindEmployeebyEmailResponseDto } from '../dto/response/getEmployeeByEmail.response.dto';
import { GetEmployeeInfoResponseDto } from '../dto/response/getEmployeeInfo.response.dto';
import { UpdateEmployeeRequestDto } from '../dto/request/updateEmployee.request.dto';
import { UpdateEmployeeResponseDto } from '../dto/response/updateEmployee.response.dto';
import { DeleteEmployeeResponseDto } from '../dto/response/deleteemployee.response.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private employeesRepository: Repository<EmployeeEntity>,
    private hashingService: HashingService,
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

  async getEmployeeInfo(
    employeeId: string,
  ): Promise<GetEmployeeInfoResponseDto> {
    try {
      const employeeInfo = await this.employeesRepository.findOne({
        where: { employeeId },
        select: ['email', 'firstName', 'lastName', 'imgUrl'],
      });
      if (!employeeInfo) {
        Logger.warn('Employee not found', 'EmployeeService');
        throw new NotFoundException('employee not found');
      }
      Logger.log('employee found', 'EmployeeService');
      return employeeInfo;
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

  async updateEmployee(
    employeeId: string,
    updatePayload: UpdateEmployeeRequestDto,
  ): Promise<UpdateEmployeeResponseDto> {
    if (updatePayload.password) {
      updatePayload.password = await this.hashingService.hashPassword(
        updatePayload.password,
      );
    }
    try {
      await this.employeesRepository.update(
        { employeeId: employeeId },
        updatePayload,
      );
      Logger.log('Employee Updated', 'EmployeeService');
      return {
        employeeId: employeeId,
        lastUpdate: new Date(),
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Error during update transaction',
        error.stack,
        'EmployeeService',
      );
      throw new InternalServerErrorException('Failed to updated employee info');
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
      return { employeeId: employeeId };
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
