import { Module } from '@nestjs/common';
import { AgentController } from './controllers/agentProjects.controller';
import { AgentService } from './services/agentProjects.service';

@Module({
  controllers: [AgentController],
  providers: [AgentService],
})
export class AgentModule {}
