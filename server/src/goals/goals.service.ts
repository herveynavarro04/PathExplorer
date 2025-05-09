import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { GoalsEntity } from './entities/goals.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGoalRequestDto } from './dto/request/postGoal.request.dto';
import { CreateGoalResponseDto } from './dto/response/postGoal.response.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(GoalsEntity)
    private goalsRepository: Repository<GoalsEntity>,
  ) {}

  async createGoal(
    userId: string,
    createGoalPayload: CreateGoalRequestDto,
  ): Promise<CreateGoalResponseDto> {
    const goalId = uuidv4();
    const newGoal = {
      ...createGoalPayload,
      userId,
      goalId,
    };
    try {
      await this.goalsRepository.save(newGoal);
      Logger.log('User created succesfully', 'GoalsService');
      return {
        goaldId: newGoal.goalId,
        createdAt: new Date(),
      };
    } catch (error) {
      Logger.error(
        'Error during goal registration',
        error.stack,
        'GoalsService',
      );
      throw new InternalServerErrorException('Failed to create goal');
    }
  }
}
