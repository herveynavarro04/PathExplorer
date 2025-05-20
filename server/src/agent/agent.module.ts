import { Module } from '@nestjs/common';
import { AgentController } from './controllers/agentProjects.controller';
import { AgentService } from './services/agent.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsEntity } from 'src/projects/entities/projects.entity';
import { EmployeeProjectEntity } from 'src/common/entities/employeeProject.entity';
import { EmployeeSkillEntity } from 'src/common/entities/employeeSkills.entity';
import { EmployeeInterestEntity } from 'src/common/entities/employeeInterests.entity';
import { AgentRepository } from './repository/agent.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectsEntity,
      EmployeeProjectEntity,
      EmployeeSkillEntity,
      EmployeeProjectEntity,
      EmployeeInterestEntity,
    ]),
  ],
  controllers: [AgentController],
  providers: [AgentService, AgentRepository],
})
export class AgentModule {}
