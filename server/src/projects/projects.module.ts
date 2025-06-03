import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsEntity } from './entities/projects.entity';
import { EmployeeProjectEntity } from 'src/common/entities/employeeProject.entity';
import { TechnologiesEntity } from 'src/common/entities/technology.entity';
import { ProjectTechnologyEntity } from 'src/common/entities/projectTechnologies.entity';
import { ProjectsService } from './service/projects.service';
import { EmployeeProjectsService } from './service/employeeProjects.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectsEntity,
      EmployeeProjectEntity,
      TechnologiesEntity,
      ProjectTechnologyEntity,
    ]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService, EmployeeProjectsService],
})
export class ProjectsModule {}
