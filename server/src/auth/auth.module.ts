import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './Guards/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from './entities/employee.entity';
import { JwtGuard } from './Guards/jwt.guards';

@Module({
  imports: [
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
  providers: [AuthService, JwtStrategy, JwtGuard],
  exports: [AuthService],
})
export class AuthModule {}
