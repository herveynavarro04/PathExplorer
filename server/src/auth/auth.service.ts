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
import { UserService } from 'src/users/services/user.service';
import { HashingService } from 'src/Utilities/hashing.utilities';
import { ValidateUserResponseDto } from './dto/response/validateUser.response.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private hashingService: HashingService,
  ) {}

  async registerUser(
    userPayload: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    if (await this.userService.verifyUserExistance(userPayload.email)) {
      throw new ConflictException('User with this email already exists');
    }

    const userId = uuidv4();
    const hashedPassword = await this.hashingService.hashPassword(
      userPayload.password,
    );
    const register = {
      userId: userId,
      email: userPayload.email,
      password: hashedPassword,
      imgUrl: process.env.DEFAULT_PROFILE_IMAGE,
      firstName: userPayload.firstName,
      lastName: userPayload.lastName,
    };
    await this.userService.registerUser(register);
    return {
      userId: register.userId,
    };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<ValidateUserResponseDto> {
    const user = await this.userService.findUserbyEmail(email);
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
    const user = await this.validateUser(
      userPayload.email,
      userPayload.password,
    );
    const token = this.jwtService.sign({
      userId: user.userId,
      email: user.email,
    });
    return {
      accessToken: token,
    };
  }
}
