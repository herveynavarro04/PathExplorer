import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/common/Guards/jwt.guards';
import { ProjectRecomendationsResponseDto } from '../dto/response/projectRecomendations.response.dto';
import { AgentService } from '../services/agent.service';

@Controller('agent')
export class AgentController {
  constructor(private agentService: AgentService) {}

  @Get('project/recommendations')
  @UseGuards(JwtGuard)
  async AgentProjectRecomendations(
    @Req() req: Request,
  ): Promise<ProjectRecomendationsResponseDto> {
    const employeeId = req.user['employeeId'];
    return this.agentService.agentProjectRecomendations(employeeId);
  }
}
