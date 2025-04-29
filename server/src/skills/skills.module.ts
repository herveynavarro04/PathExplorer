import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { SkillsEntity } from './entities/skills.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SkillsEntity])],
  providers: [SkillsService],
  controllers: [SkillsController],
})
export class SkillsModule {}
