import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/common/Guards/jwt.guards';
import { Request } from 'express';
import { PostStoryRequestDto } from './dto/request/postStory.request.dto';
import { PostStoryResponseDto } from './dto/response/postStory.response.dto';
import { HistoryService } from './history.service';
import { UpdateHistoryResponseDto } from './dto/response/updateHistory.response.dto';
import { UpdateHistoryRequestDto } from './dto/request/updateHistory.request.dto';
import { GetHistoriesResponeDto } from './dto/response/getHistories.dto.response';

@Controller('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Post()
  @UseGuards(JwtGuard)
  async postHistory(
    @Req() req: Request,
    @Body() postStoryPayload: PostStoryRequestDto,
  ): Promise<PostStoryResponseDto> {
    const employeeId = req.user['employeeId'];
    return this.historyService.postHistory(employeeId, postStoryPayload);
  }

  @Get()
  @UseGuards(JwtGuard)
  async getHistories(@Req() req: Request): Promise<GetHistoriesResponeDto> {
    const employeeId = req.user['employeeId'];
    return this.historyService.getHistories(employeeId);
  }

  @Get('employee/:employeeId')
  @UseGuards(JwtGuard)
  async getEmployeeHistories(
    @Param('employeeId') employeeId: string,
  ): Promise<GetHistoriesResponeDto> {
    return this.historyService.getHistories(employeeId);
  }

  @Patch()
  @UseGuards(JwtGuard)
  async updateHistory(
    @Body() updateHistoryPayload: UpdateHistoryRequestDto,
  ): Promise<UpdateHistoryResponseDto> {
    const historyId = updateHistoryPayload.historyId;
    return this.historyService.updateHistory(historyId, updateHistoryPayload);
  }

  @Delete(':historyId')
  @UseGuards()
  async deleteHistory(@Param('historyId') historyId: string): Promise<void> {
    return this.historyService.deleteHistory(historyId);
  }
}
