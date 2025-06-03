import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { GoalsEntity } from './entities/goals.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostGoalRequestDto } from './dto/request/postGoal.request.dto';
import { v4 as uuidv4 } from 'uuid';
import { GetGoalResponseDto } from './dto/response/getGoal.response.dto';
import { PostGoalResponseDto } from './dto/response/postGoal.response.dto';
import { GoalsResponseDto } from './dto/response/getGoals.response.dto';
import { UpdateGoalStatusRequestDto } from './dto/request/updateGoalStatus.request.dto';
import { UpdateGoalStatusResponseDto } from './dto/response/updateGoalStatus.reponse.dto';

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(GoalsEntity)
    private goalsRepository: Repository<GoalsEntity>,
  ) {}

  async createGoal(
    employeeId: string,
    postGoalPayload: PostGoalRequestDto,
  ): Promise<PostGoalResponseDto> {
    const goalId = uuidv4();

    const newGoal: GoalsEntity = {
      employeeId: employeeId,
      goalId: goalId,
      completed: false,
      status: 'pending',
      reviserId: null,
      information: postGoalPayload.information,
      term: postGoalPayload.term,
      createdAt: new Date(),
      updatedAt: null,
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

  async updateGoalStatus(
    reviserId: string,
    goalId: string,
    updatePayload: UpdateGoalStatusRequestDto,
  ): Promise<UpdateGoalStatusResponseDto> {
    try {
      await this.goalsRepository.update(
        {
          goalId: goalId,
        },
        {
          reviserId: reviserId,
          status: updatePayload.status,
          updatedAt: new Date(),
        },
      );
      Logger.log('Goal status succesfully updated!', 'GoalsService');
      return {
        goalId: goalId,
        updatedAt: new Date(),
      };
    } catch (error) {
      Logger.error(
        'Error during goal status update',
        error.stack,
        'GoalsService',
      );
      throw new InternalServerErrorException('Failed to update goal');
    }
  }

  async getGoals(employeeId: string): Promise<GoalsResponseDto> {
    try {
      const goals = await this.goalsRepository.find({
        where: { employeeId: employeeId },
        select: ['status', 'completed', 'information', 'term', 'goalId'],
      });
      const goalsInfo: GetGoalResponseDto[] = goals.map((goal) => ({
        completed: goal.completed,
        status: goal.status,
        information: goal.information,
        term: goal.term,
        goalId: goal.goalId,
      }));
      Logger.log('Goals fetched succesfully', 'GoalsService');
      return {
        goals: goalsInfo,
      };
    } catch (error) {
      Logger.error('Error during goals fetching', error.stack, 'GoalsService');
      throw new InternalServerErrorException('Failed to fetch goals');
    }
  }
}
