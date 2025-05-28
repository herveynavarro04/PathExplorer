import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackEntity } from './entity';
import { Repository } from 'typeorm';
import { PostFeedbackResponseDto } from './dto/response/postFeedback.response.dto';
import { v4 as uuidv4 } from 'uuid';
import { PostFeedbackRequestDto } from './dto/request/postFeedback.request.dto';
import { GetEmployeeFeedbackDtoResponse } from './dto/response/getEmployeeFeedback.response.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(FeedbackEntity)
    private feedbackRepository: Repository<FeedbackEntity>,
  ) {}

  async postFeedback(
    employeeId: string,
    reviserId: string,
    postFeedbackPayload: PostFeedbackRequestDto,
  ): Promise<PostFeedbackResponseDto> {
    const feedbackId = uuidv4();
    const register: FeedbackEntity = {
      feedbackId: feedbackId,
      employeeId: employeeId,
      reviserId: reviserId,
      information: postFeedbackPayload.information,
      createdAt: new Date(),
      updatedAt: null,
    };
    try {
      await this.feedbackRepository.save(register);
      Logger.log('Feedback created succesfully', 'FeedbackService');
      return {
        feedbackId: feedbackId,
      };
    } catch (error) {
      Logger.error(
        'Error during feedback registration',
        error.stack,
        'FeedbackService',
      );
      throw new InternalServerErrorException('Failed to create feedback');
    }
  }

  async getEmployeeFeedback(
    employeeId: string,
  ): Promise<GetEmployeeFeedbackDtoResponse[]> {
    try {
      const employeeFeedback = await this.feedbackRepository.find({
        where: { employeeId: employeeId },
        select: [
          'createdAt',
          'reviserId',
          'information',
          'employee',
          'feedbackId',
        ],
        relations: ['reviser'],
      });
      const feedbacks = employeeFeedback.map((link) => ({
        feedbackId: link.feedbackId,
        information: link.information,
        createdAt: link.createdAt,
        reviserFirstName: link.reviser?.firstName,
        reviserLastName: link.reviser?.lastName,
      }));
      Logger.log('Feedback fetched successfully', 'FeedbackService');
      return feedbacks;
    } catch (error) {
      Logger.error(
        'Error during feedback fetch',
        error.stack,
        'FeedbackService',
      );
      throw new InternalServerErrorException('Failed to fetch feedback');
    }
  }
}
