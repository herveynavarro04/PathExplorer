import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserController } from './controllers/user.controller';
import { HashingService } from 'src/Utilities/hashing.utilities';
import { UserProjectsController } from './controllers/userProjects.controller';
import { UserSkillsController } from './controllers/userSkills.controller';
import { UserSkillsService } from './services/userSkills.service';
import { UserProjectsService } from './services/userProjects.service';
import { DatabaseHelperService } from 'src/common/helpers/dataBase.helper';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    UserService,
    HashingService,
    UserSkillsService,
    UserProjectsService,
    DatabaseHelperService,
  ],
  controllers: [UserController, UserProjectsController, UserSkillsController],
  exports: [UserService],
})
export class UsersModule {}
