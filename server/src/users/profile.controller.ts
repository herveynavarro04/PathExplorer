import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/Guards/jwt.guards';
import { UserEntity } from './entities/user.entity';
import { Request } from 'express';

@Controller('users/profile')
export class Profile {
  constructor(private usersService: UsersService) {}

  @Get('info')
  @UseGuards(JwtGuard)
  async getProfile(@Req() req: Request): Promise<UserEntity> {
    const userId = req.user['id'];
    return this.usersService.
  }
}  
