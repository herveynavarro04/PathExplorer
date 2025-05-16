import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/common/Guards/jwt.guards';
import { Request } from 'express';
import { PostGoalRequestDto } from './dto/request/postGoal.request.dto';
import { PostGoalResponseDto } from './dto/response/postGoal.response.dto';
import { GoalsService } from './goals.service';
import { GetGoalResponseDto } from './dto/response/getGoal.response.dto';
import { GoalsResponseDto } from './dto/response/getGoals.response.dto';

@Controller('goals')
export class GoalsController {
  constructor(private goalsService: GoalsService) {}

  @Post()
  @UseGuards(JwtGuard)
  async createGoal(
    @Req() req: Request,
    @Body() postGoalPayload: PostGoalRequestDto,
  ): Promise<PostGoalResponseDto> {
    const employeeId = req.user['employeeId'];
    return this.goalsService.createGoal(employeeId, postGoalPayload);
  }

  @Get()
  @UseGuards(JwtGuard)
  async getGoals(@Req() req: Request): Promise<GoalsResponseDto> {
    const employeeId = req.user['employeeId'];
    return this.goalsService.getGoals(employeeId);
  }
}
