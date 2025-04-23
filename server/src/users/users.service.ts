import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ProfileInfoResponseDto } from './dto/response/profileInfo.response.dto';
import { ProfileUpdateRequestDto } from './dto/request/profileUpdate.request.dto';
import { DeleteProfileResponseDto } from './dto/response/deleteProfile.response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async registerUser(register: UserEntity) {
    try {
      await this.usersRepository.save(register);
      Logger.log('User created', {
        userId: register.userId,
        email: register.email,
      });
    } catch (error) {
      Logger.error('Error during user registration', error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }
  async verifyUserExistance(email: string): Promise<boolean> {
    try {
      return await this.usersRepository.exists({
        where: { email },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error('Error during user verification', error);
      throw new InternalServerErrorException('Failed to verify user');
    }
  }

  async findUserbyEmail(email: string): Promise<UserEntity> {
    try {
      const user = await this.usersRepository.findOne({
        where: { email },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error('Error during user validation', error);
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
        throw new NotFoundException('User not found');
      }
      return userInfo;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error('Error during user info fetching', error);
      throw new InternalServerErrorException('Failed to get user info');
    }
  }

  async updateProfileInfo(
    userId: string,
    updatePayload: ProfileUpdateRequestDto,
  ): Promise<ProfileInfoResponseDto> {
    if (updatePayload.password) {
      updatePayload.password = await this.hashPassword(updatePayload.password);
    }
    try {
      await this.usersRepository.update({ userId }, updatePayload);
      const updatedUser = await this.getProfileInfo(userId);
      return updatedUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error('Error during update transaction', error);
      throw new InternalServerErrorException('Failed to updated user info');
    }
  }

  async deleteProfile(userId: string): Promise<DeleteProfileResponseDto> {
    try {
      const deleteResult = await this.usersRepository.delete({ userId });
      if (deleteResult.affected === 0) {
        throw new NotFoundException(`User not found`);
      }
      Logger.log('User deleted successfully');
      return { userId };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      Logger.error('Error during delete transaction', error);
      throw new InternalServerErrorException('Failed to delete user');
    }
  }
}
