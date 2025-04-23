import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ProfileController } from './profile.controller';
import { HashingService } from 'src/Utilities/hashing.utilities';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService, HashingService],
  controllers: [ProfileController],
  exports: [UsersService],
})
export class UsersModule {}
