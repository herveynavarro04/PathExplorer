import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { GoalsEntity } from './entities/goals.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostGoalRequestDto } from './dto/request/postGoal.request.dto';
import { CreateGoalResponseDto } from './dto/response/postGoal.response.dto';
import { v4 as uuidv4 } from 'uuid';
import { CreateGoalRequestDto } from './dto/request/createGoal.request.dto';
import { GetGoalResponseDto } from './dto/response/getGoal.response.dto';
import { GetUserGoalsResponseDto } from './dto/response/getUserGoals.response.dto';

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(GoalsEntity)
    private goalsRepository: Repository<GoalsEntity>,
  ) {}

  async createGoal(
    userId: string,
    createGoalPayload: PostGoalRequestDto,
  ): Promise<CreateGoalResponseDto> {
    const goalId = uuidv4();

    const newGoal: CreateGoalRequestDto = {
      userId: userId,
      goalId: goalId,
      completed: false,
      validated: false,
      reviserId: null,
      information: createGoalPayload.information,
      term: createGoalPayload.term,
      createdAt: new Date(),
    };
    try {
      await this.goalsRepository.save(newGoal);
      Logger.log('Goal created succesfully', 'GoalsService');
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

  async getGoals(userId: string): Promise<GetUserGoalsResponseDto> {
    try {
      const goals = await this.goalsRepository.find({
        where: { userId: userId },
        select: ['validated', 'completed', 'information', 'term'],
      });
      const goalsInfo: GetGoalResponseDto[] = goals.map((goal) => ({
        completed: goal.completed,
        validated: goal.validated,
        information: goal.information,
        term: goal.term,
      }));
      Logger.log('Goals fetched succesfully', 'GoalsService');
      return {
        userGoals: goalsInfo,
      };
    } catch (error) {
      Logger.error('Error during goals fetching', error.stack, 'GoalsService');
      throw new InternalServerErrorException('Failed to fetch goals');
    }
  }
}
