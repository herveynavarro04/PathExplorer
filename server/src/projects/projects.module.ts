import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsEntity } from './entities/projects.entity';
import { TechnologiesEntity } from 'src/common/entities/technologies.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectsEntity, TechnologiesEntity])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
