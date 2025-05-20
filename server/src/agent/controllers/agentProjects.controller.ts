import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/common/Guards/jwt.guards';
import { ProjectRecomendationsResponseDto } from '../dto/response/projectRecomendations.response.dto';
import { AgentService } from '../services/agent.service';

@Controller('agent/project')
export class AgentController {
  constructor(private agentService: AgentService) {}

  @Post('recomendations')
  @UseGuards(JwtGuard)
  async AgentProjectRecomendations(
    @Req() req: Request,
  ): Promise<ProjectRecomendationsResponseDto> {
    const employeeId = req.user['employeeId'];
    return this.agentService.agentProjectRecomendations(employeeId);
  }
}
