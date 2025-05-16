import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { PostStoryRequestDto } from './dto/request/postStory.request.dto';
import { UpdateHistoryRequestDto } from './dto/request/updateHistory.request.dto';
import { GetHistoryResponseDto } from './dto/response/getHistory.response.dto';
import { PostStoryResponseDto } from './dto/response/postStory.response.dto';
import { UpdateHistoryResponseDto } from './dto/response/updateHistory.response.dto';
import { HistoryEntity } from './entities/history.entity';
import { DeleteHistoryResponseDto } from './dto/response/deleteHistory.response.dto';
import { GetHistoriesResponeDto } from './dto/response/getHistories.dto.response';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(HistoryEntity)
    private historyRepository: Repository<HistoryEntity>,
  ) {}

  async postHistory(
    employeeId: string,
    postStoryPayload: PostStoryRequestDto,
  ): Promise<PostStoryResponseDto> {
    try {
      const historyId = uuidv4();
      const newHistory: HistoryEntity = {
        historyId: historyId,
        employeeId: employeeId,
        ...postStoryPayload,
        createdAt: new Date(),
        updatedAt: null,
      };
      await this.historyRepository.save(newHistory);
      Logger.log('New history created', 'HistoryService');
      return {
        historyId: historyId,
        createdAt: newHistory.createdAt,
      };
    } catch (error) {
      Logger.error('Error creating new history', error.stack, 'HistoryService');
      throw new InternalServerErrorException('Failed to create new history');
    }
  }

  async updateHistory(
    historyId: string,
    updateHistoryPayload: UpdateHistoryRequestDto,
  ): Promise<UpdateHistoryResponseDto> {
    try {
      const updatedHistory = {
        ...updateHistoryPayload,
        updatedAt: new Date(),
      };
      await this.historyRepository.update(
        { historyId: historyId },
        updatedHistory,
      );
      Logger.log('History updated', 'HistoryService');
      return {
        historyId: updatedHistory.historyId,
        updatedAt: updatedHistory.updatedAt,
      };
    } catch (error) {
      Logger.error('Error updating history', error.stack, 'HistoryService');
      throw new InternalServerErrorException('Failed to update history');
    }
  }

  async getHistories(employeeId: string): Promise<GetHistoriesResponeDto> {
    try {
      const histories = await this.historyRepository.find({
        where: { employeeId: employeeId },
        select: [
          'company',
          'historyId',
          'endDate',
          'information',
          'position',
          'startDate',
        ],
      });
      const historiesInfo: GetHistoryResponseDto[] = histories.map(
        (history) => ({
          company: history.company,
          historyId: history.historyId,
          endDate: history.endDate,
          information: history.information,
          position: history.position,
          startDate: history.startDate,
        }),
      );
      Logger.log('Histories succesfully fetched', 'HistoryService');
      return {
        histories: historiesInfo,
      };
    } catch (error) {
      Logger.error('Error fetching histories', error.stack, 'HistoryService');
      throw new InternalServerErrorException('Failed to fetch histories');
    }
  }

  async deleteHistory(historyId: string): Promise<DeleteHistoryResponseDto> {
    try {
      await this.historyRepository.delete({ historyId: historyId });
      Logger.log('History succesfully deleted', 'HistoryService');
      return {
        historyId: historyId,
      };
    } catch (error) {
      Logger.error('Error deleting history', error.stack, 'HistoryService');
      throw new InternalServerErrorException('Failed to delete history');
    }
  }
}
