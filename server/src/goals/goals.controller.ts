import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/common/Guards/jwt.guards';
import { Request } from 'express';
import { PostGoalRequestDto } from './dto/request/postGoal.request.dto';
import { CreateGoalResponseDto } from './dto/response/postGoal.response.dto';
import { GoalsService } from './goals.service';
import { GetUserGoalsResponseDto } from './dto/response/getUserGoals.response.dto';

@Controller('goals')
export class GoalsController {
  constructor(private goalsService: GoalsService) {}

  @Post()
  @UseGuards(JwtGuard)
  async createGoal(
    @Req() req: Request,
    @Body() createGoalPayload: PostGoalRequestDto,
  ): Promise<CreateGoalResponseDto> {
    const userId = req.user['userId'];
    return this.goalsService.createGoal(userId, createGoalPayload);
  }

  @Get()
  @UseGuards(JwtGuard)
  async getGoals(@Req() req: Request): Promise<GetUserGoalsResponseDto> {
    const userId = req.user['userId'];
    return this.goalsService.getGoals(userId);
  }
}
