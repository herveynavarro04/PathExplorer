import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsEntity } from './entities/projects.entity';
import { TechnologiesEntity } from 'src/common/entities/technologies.entity';
import { ProjectUserEntity } from 'src/common/entities/projectUser.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectsEntity,
      TechnologiesEntity,
      ProjectUserEntity,
    ]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
