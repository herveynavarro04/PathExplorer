import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashingService } from 'src/Utilities/hashing.utilities';
import { RegisterRequestDto } from './dto/request/register.request.dto';
import { UpdateEmployeeRequestDto } from './dto/request/updateEmployee.request.dto';
import { DeleteEmployeeResponseDto } from './dto/response/deleteEmployee.response.dto';
import { FindEmployeebyEmailResponseDto } from './dto/response/getEmployeeByEmail.response.dto';
import { GetEmployeeInfoResponseDto } from './dto/response/getEmployeeInfo.response.dto';
import { RegisterResponseDto } from './dto/response/register.response.dto';
import { UpdateEmployeeResponseDto } from './dto/response/updateEmployee.response.dto';
import { EmployeeEntity } from './entities/employee.entity';
import { EmployeeProfilePicture } from './entities/employeeProfilePicture.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private employeesRepository: Repository<EmployeeEntity>,
    @InjectRepository(EmployeeProfilePicture)
    private employeeProfilePicturesRepository: Repository<EmployeeProfilePicture>,
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
        relations: ['profilePicture'],
      });
      if (!employeeInfo) {
        Logger.warn('Employee not found', 'EmployeeService');
        throw new NotFoundException('employee not found');
      }

      const result = {
        email: employeeInfo.email,
        firstName: employeeInfo.firstName,
        lastName: employeeInfo.lastName,
        profilePicture:
          employeeInfo?.profilePicture?.imageData.toString('base64') ||
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
      await this.employeeProfilePicturesRepository.update(
        { employee: { employeeId: employeeId } },
        {
          imageData: imageBuffer,
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
