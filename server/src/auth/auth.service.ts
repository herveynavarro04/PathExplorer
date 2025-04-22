import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignInResponseDto } from './dto/response/signIn.response.dto';
import { SignInRequestDto } from './dto/request/signIn.request';
import * as bcrypt from 'bcrypt';
import { RegisterRequestDto } from './dto/request/register.request.dto';
import { RegisterResponseDto } from './dto/response/register.response.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly authRepository: Repository<EmployeeEntity>,
    private jwtService: JwtService,
  ) {}

  async registerUser(
    userPayload: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    if (await this.verifyUserExistance(userPayload.email)) {
      throw new ConflictException('User with this email already exists');
    }
    try {
      const id_employee = uuidv4();
      const hashedPassword = await bcrypt.hash(userPayload.password, 10);
      const register: EmployeeEntity = {
        id_employee: id_employee,
        email: userPayload.email,
        password: hashedPassword,
        img_url: process.env.DEFAULT_PROFILE_IMAGE,
        firstName: userPayload.firstName,
        lastName: userPayload.lastName,
      };
      await this.authRepository.save(register);
      Logger.log('User created', {
        id_employee: register.id_employee,
        email: register.email,
      });
      return {
        id_employee: register.id_employee,
        email: register.email,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      Logger.error(error);
      throw new Error('Error when creating the User');
    }
  }

  async verifyUserExistance(email: string): Promise<boolean> {
    return await this.authRepository.exists({
      where: { email },
    });
  }
  async validateUser(email: string, password: string): Promise<EmployeeEntity> {
    const user = await this.authRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Email or password incorrect');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      delete user.password;
      Logger.log('User validated');
      return user;
    } else {
      throw new UnauthorizedException('Email or password incorrect');
    }
  }

  async signIn(userPayload: SignInRequestDto): Promise<SignInResponseDto> {
    const { email, password } = userPayload;

    try {
      const user = await this.validateUser(email, password);
      const token = this.jwtService.sign({
        id: user.id_employee,
        email: user.email,
      });
      Logger.log('TOKEN GENERATED', {
        userId: user.id_employee,
        accessToken: token,
      });
      return {
        userId: user.id_employee,
        accessToken: token,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      Logger.error('TOKEN NOT GENERATED', error);
      throw new Error('Failed to generate token');
    }
  }
}
