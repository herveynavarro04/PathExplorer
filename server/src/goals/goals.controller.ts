import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/common/Guards/jwt.guards';
import { Request } from 'express';
import { PostGoalRequestDto } from './dto/request/postGoal.request.dto';
import { PostGoalResponseDto } from './dto/response/postGoal.response.dto';
import { GoalsService } from './goals.service';
import { GetGoalResponseDto } from './dto/response/getGoal.response.dto';

@Controller('goals')
export class GoalsController {
  constructor(private goalsService: GoalsService) {}

  @Post()
  @UseGuards(JwtGuard)
  async createGoal(
    @Req() req: Request,
    @Body() postGoalPayload: PostGoalRequestDto,
  ): Promise<PostGoalResponseDto> {
    const userId = req.user['userId'];
    return this.goalsService.createGoal(userId, postGoalPayload);
  }

  @Get()
  @UseGuards(JwtGuard)
  async getGoals(@Req() req: Request): Promise<GetGoalResponseDto[]> {
    const userId = req.user['userId'];
    return this.goalsService.getGoals(userId);
  }
}
