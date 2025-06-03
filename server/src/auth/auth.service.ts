import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInResponseDto } from './dto/response/signIn.response.dto';
import { SignInRequestDto } from './dto/request/signIn.request';
import * as bcrypt from 'bcrypt';
import { RegisterRequestDto } from './dto/request/register.request.dto';
import { RegisterResponseDto } from './dto/response/register.response.dto';
import { v4 as uuidv4 } from 'uuid';
import { HashingService } from 'src/Utilities/hashing.utilities';
import { EmployeeEntity } from 'src/employee/entities/employee.entity';
import { ValidateEmployeeResponseDto } from './dto/response/validateUser.response.dto';
import { EmployeeService } from 'src/employee/employee.service';

@Injectable()
export class AuthService {
  constructor(
    private employeeService: EmployeeService,
    private jwtService: JwtService,
    private hashingService: HashingService,
  ) {}

  async registerEmployee(
    employeePayload: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    if (
      await this.employeeService.verifyEmployeeExistance(employeePayload.email)
    ) {
      throw new ConflictException('employee with this email already exists');
    }

    const employeeId = uuidv4();
    const hashedPassword = await this.hashingService.hashPassword(
      employeePayload.password,
    );
    const register: EmployeeEntity = {
      employeeId: employeeId,
      email: employeePayload.email,
      password: hashedPassword,
      rol: employeePayload.rol,
      level: 1,
      createdAt: new Date(),
      updatedAt: null,
      firstName: employeePayload.firstName,
      lastName: employeePayload.lastName,
      active: true,
    };
    await this.employeeService.registerEmployee(register);
    return {
      employeeId: register.employeeId,
    };
  }

  async validateEmployee(
    email: string,
    password: string,
  ): Promise<ValidateEmployeeResponseDto> {
    const employee = await this.employeeService.findEmployeebyEmail(email);
    if (!employee) {
      throw new UnauthorizedException('Email or password incorrect');
    }

    const isPasswordValid = await bcrypt.compare(password, employee.password);
    if (isPasswordValid && employee.active === true) {
      delete employee.password;
      return employee;
    } else {
      throw new UnauthorizedException('Email or password incorrect');
    }
  }

  async signIn(employeePayload: SignInRequestDto): Promise<SignInResponseDto> {
    const employee = await this.validateEmployee(
      employeePayload.email,
      employeePayload.password,
    );
    const isPeopleLead = await this.employeeService.checkIfPeopleLead(
      employee.employeeId,
    );
    const token = this.jwtService.sign({
      employeeId: employee.employeeId,
      email: employee.email,
      rol: employee.rol,
      isPeopleLead: isPeopleLead,
    });
    return {
      accessToken: token,
    };
  }
}
