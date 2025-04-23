import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './Guards/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { JwtGuard } from './Guards/jwt.guards';
import { UsersModule } from 'src/users/users.module';
import { HashingService } from 'src/Utilities/hashing.utilities';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    UsersModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.TOKEN_SECRET,
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtGuard, HashingService],
  exports: [AuthService],
})
export class AuthModule {}
