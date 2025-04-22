import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async registerUser(register: UserEntity) {
    try {
      await this.usersRepository.save(register);
      Logger.log('User created', {
        id_employee: register.id_employee,
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
      Logger.error('Error during user verification', error);
      throw new InternalServerErrorException('Failed to verify user');
    }
  }

  async findUserbyEmail(email: string): Promise<UserEntity> {
    try {
      const user = await this.usersRepository.findOne({
        where: { email },
      });
      return user;
    } catch (error) {
      Logger.error('Error during user validation', error);
      throw new InternalServerErrorException('Failed to validate user');
    }
  }

  async getProfileInfo(id: string): Promise<UserEntity>{
    
  }
}
