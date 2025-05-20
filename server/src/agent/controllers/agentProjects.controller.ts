import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/common/Guards/jwt.guards';
import { ProjectRecomendationsResponseDto } from '../dto/response/projectRecomendations.response.dto';

@Controller('agent/project')
export class AgentController {
  constructor() {}

  @Post('recomendations')
  @UseGuards(JwtGuard)
  async AgentProjectRecomendations(
    @Req() req: Request,
  ): Promise<ProjectRecomendationsResponseDto> {
    const employeeId = req.user['employeeId'];
  }
}
