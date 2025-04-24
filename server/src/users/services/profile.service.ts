import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ProfileInfoResponseDto } from '../dto/response/profileInfo.response.dto';
import { ProfileUpdateRequestDto } from '../dto/request/profileUpdate.request.dto';
import { DeleteProfileResponseDto } from '../dto/response/deleteProfile.response.dto';
import { HashingService } from 'src/Utilities/hashing.utilities';
import { RegisterRequestDto } from '../dto/request/register.request.dto';
import { FindUserbyEmailResponseDto } from '../dto/response/findUserByEmail.response.dto';
import { RegisterResponseDto } from '../dto/response/register.response.dto';
import { UpdateProfileResponseDto } from '../dto/response/updateProfile.response.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private hashingService: HashingService,
  ) {}

  async registerUser(
    register: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    try {
      await this.usersRepository.save(register);
      Logger.log('User created succesfully', 'UserService');
      return {
        userId: register.userId,
      };
    } catch (error) {
      Logger.error(
        'Error during user registration',
        error.stack,
        'UserService',
      );
      throw new InternalServerErrorException('Failed to create user');
    }
  }
  async verifyUserExistance(email: string): Promise<boolean> {
    try {
      const user = await this.usersRepository.exists({
        where: { email },
      });
      Logger.log('User exists');
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Error during user verification',
        error.stack,
        'UserService',
      );
      throw new InternalServerErrorException('Failed to verify user');
    }
  }

  async findUserbyEmail(email: string): Promise<FindUserbyEmailResponseDto> {
    try {
      const user = await this.usersRepository.findOne({
        where: { email },
      });
      if (!user) {
        Logger.warn('User not found', 'UserService');
        throw new NotFoundException('User not found');
      }
      Logger.log('User found', 'UserService');
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Unexpected error during user validation',
        error.stack,
        'UserService',
      );
      throw new InternalServerErrorException('Failed to validate user');
    }
  }

  async getProfileInfo(userId: string): Promise<ProfileInfoResponseDto> {
    try {
      const userInfo = await this.usersRepository.findOne({
        where: { userId },
        select: ['email', 'firstName', 'lastName', 'imgUrl'],
      });
      if (!userInfo) {
        Logger.warn('Profile not found', 'UserService');
        throw new NotFoundException('User not found');
      }
      Logger.warn('Profile found', 'UserService');
      return userInfo;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Error during user info fetching',
        error.stack,
        'UserService',
      );
      throw new InternalServerErrorException('Failed to get user info');
    }
  }

  async updateProfile(
    userId: string,
    updatePayload: ProfileUpdateRequestDto,
  ): Promise<UpdateProfileResponseDto> {
    if (updatePayload.password) {
      updatePayload.password = await this.hashingService.hashPassword(
        updatePayload.password,
      );
    }
    try {
      await this.usersRepository.update({ userId }, updatePayload);
      Logger.log('Profile Updated', 'UserService');
      return {
        userId: userId,
        lastUpdate: new Date(),
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Error during update transaction',
        error.stack,
        'UserService',
      );
      throw new InternalServerErrorException('Failed to updated user info');
    }
  }

  async deleteProfile(userId: string): Promise<DeleteProfileResponseDto> {
    try {
      const deleteResult = await this.usersRepository.delete({ userId });
      if (deleteResult.affected === 0) {
        Logger.warn('User not found', 'UserService');
        throw new NotFoundException(`User not found`);
      }
      Logger.log('User deleted successfully');
      return { userId: userId };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error(
        'Error during delete transaction',
        error.stack,
        'UserService',
      );
      throw new InternalServerErrorException('Failed to delete user');
    }
  }
}
