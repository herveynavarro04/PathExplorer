import { Module } from '@nestjs/common';
import { ProfileService } from './services/profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ProfileController } from './controllers/profile.controller';
import { HashingService } from 'src/Utilities/hashing.utilities';
import { SkillsEntity } from './entities/skills.entity';
import { SkillsController } from './controllers/skills.controller';
import { SkillsService } from './services/skills.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, SkillsEntity])],
  providers: [ProfileService, HashingService, SkillsService],
  controllers: [ProfileController, SkillsController],
  exports: [ProfileService],
})
export class UsersModule {}
