import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from '../users/entities/user.entity';
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
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async registerUser(
    userPayload: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    if (await this.usersService.verifyUserExistance(userPayload.email)) {
      throw new ConflictException('User with this email already exists');
    }

    const userId = uuidv4();
    const hashedPassword = await this.hashPassword(userPayload.password);
    const register: UserEntity = {
      userId: userId,
      email: userPayload.email,
      password: hashedPassword,
      imgUrl: process.env.DEFAULT_PROFILE_IMAGE,
      firstName: userPayload.firstName,
      lastName: userPayload.lastName,
    };
    await this.usersService.registerUser(register);
    return {
      userId: register.userId,
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
      userId: user.userId,
      email: user.email,
    });
    Logger.log('TOKEN GENERATED', {
      userId: user.userId,
      accessToken: token,
    });
    return {
      userId: user.userId,
      accessToken: token,
    };
  }
}
