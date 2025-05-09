import { Module } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { GoalsController } from './goals.controller';
import { GoalsEntity } from './entities/goals.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([GoalsEntity])],
  providers: [GoalsService],
  controllers: [GoalsController],
})
export class GoalsModule {}
