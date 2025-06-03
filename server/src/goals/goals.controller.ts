import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/Guards/jwt.guards';
import { Request } from 'express';
import { PostGoalRequestDto } from './dto/request/postGoal.request.dto';
import { PostGoalResponseDto } from './dto/response/postGoal.response.dto';
import { GoalsService } from './goals.service';
import { GoalsResponseDto } from './dto/response/getGoals.response.dto';
import { UpdateGoalStatusRequestDto } from './dto/request/updateGoalStatus.request.dto';
import { UpdateGoalStatusResponseDto } from './dto/response/updateGoalStatus.reponse.dto';

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

  @Patch(':goalId')
  @UseGuards(JwtGuard)
  async updateGoalStatus(
    @Req() req: Request,
    @Param('goalId') goalId: string,
    @Body() updatePayload: UpdateGoalStatusRequestDto,
  ): Promise<UpdateGoalStatusResponseDto> {
    const reviserId = req.user['employeeId'];
    return this.goalsService.updateGoalStatus(reviserId, goalId, updatePayload);
  }

  @Get(':employeeId')
  @UseGuards(JwtGuard)
  async getGoalsByEmployeeId(
    @Param('employeeId') employeeId: string,
  ): Promise<GoalsResponseDto> {
    return this.goalsService.getGoals(employeeId);
  }
}
