import { Module } from '@nestjs/common';
import { SkillsController } from './skills.controller';
import { SkillsEntity } from './entities/skills.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsService } from './service/skills.service';
import { EmployeeSkillEntity } from 'src/common/entities/employeeSkills.entity';
import { EmployeeSkillsService } from './service/employeeSkillsService.service';
import { EmployeeInterestEntity } from 'src/common/entities/employeeInterests.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SkillsEntity,
      EmployeeSkillEntity,
      EmployeeInterestEntity,
    ]),
  ],
  providers: [SkillsService, EmployeeSkillsService],
  controllers: [SkillsController],
})
export class SkillsModule {}
