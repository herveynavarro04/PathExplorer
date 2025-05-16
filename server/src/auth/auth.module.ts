import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../common/Guards/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtGuard } from '../common/Guards/jwt.guards';
import { HashingService } from 'src/Utilities/hashing.utilities';
import { EmployeeModule } from 'src/employee/employee.module';
import { EmployeeEntity } from 'src/employee/entities/employee.entity';

@Module({
  imports: [
    EmployeeModule,
    PassportModule,
    TypeOrmModule.forFeature([EmployeeEntity]),
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
