import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsEntity } from './entities/projects.entity';
import { ProjectUserEntity } from 'src/common/entities/projectUser.entity';
import { TechnologiesEntity } from 'src/common/entities/technologies.entity';
import { DatabaseHelperService } from 'src/common/helpers/dataBase.helper';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectsEntity,
      ProjectUserEntity,
      TechnologiesEntity,
    ]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService, DatabaseHelperService],
})
export class ProjectsModule {}
