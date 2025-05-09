import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/common/Guards/jwt.guards';
import { Request } from 'express';
import { CreateGoalRequestDto } from './dto/request/postGoal.request.dto';
import { CreateGoalResponseDto } from './dto/response/postGoal.response.dto';
import { GoalsService } from './goals.service';

@Controller('goals')
export class GoalsController {
  constructor(private goalsService: GoalsService) {}

  @Post()
  @UseGuards(JwtGuard)
  async createGoal(
    @Req() req: Request,
    @Body() createGoalPayload: CreateGoalRequestDto,
  ): Promise<CreateGoalResponseDto> {
    const userId = req.user['userId'];
    return this.goalsService.createGoal(userId, createGoalPayload);
  }

  // @Get()
  // @UseGuards(JwtGuard)
  // async getGoalsById(
  //   @Req() req: Request,
  // ): Promise<CreateGoalResponseDto> {
  //   const userId = req.user['userId'];
  //   return this.goalsService.getGoalsById(userId);
  // }
}
