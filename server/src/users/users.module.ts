import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ProfileController } from './controllers/profile.controller';
import { HashingService } from 'src/Utilities/hashing.utilities';
import { UserProjectsController } from './controllers/userProjects.controller';
import { UserSkillsController } from './controllers/userSkills.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, HashingService],
  controllers: [
    ProfileController,
    UserProjectsController,
    UserSkillsController,
  ],
  exports: [UserService],
})
export class UsersModule {}
