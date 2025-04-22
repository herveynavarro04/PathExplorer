import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignInResponseDto } from './dto/response/signIn.response.dto';
import { SignInRequestDto } from './dto/request/signIn.request';
import * as bcrypt from 'bcrypt';
import { RegisterRequestDto } from './dto/request/register.request.dto';
import { RegisterResponseDto } from './dto/response/register.response.dto';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly authRepository: Repository<UserEntity>,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async registerUser(
    userPayload: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    if (await this.usersService.verifyUserExistance(userPayload.email)) {
      throw new ConflictException('User with this email already exists');
    }

    const id_employee = uuidv4();
    const hashedPassword = await bcrypt.hash(userPayload.password, 10);
    const register: UserEntity = {
      id_employee: id_employee,
      email: userPayload.email,
      password: hashedPassword,
      img_url: process.env.DEFAULT_PROFILE_IMAGE,
      firstName: userPayload.firstName,
      lastName: userPayload.lastName,
    };
    await this.usersService.registerUser(register);
    return {
      id_employee: register.id_employee,
      email: register.email,
    };
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.usersService.findUserbyEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email or password incorrect');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      delete user.password;
      return user;
    } else {
      throw new UnauthorizedException('Email or password incorrect');
    }
  }

  async signIn(userPayload: SignInRequestDto): Promise<SignInResponseDto> {
    const { email, password } = userPayload;
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
  }
}
