//TODO: post project aplications endpoint
//TODO: withdraw project aplications endpoint
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtGuard } from 'src/auth/Guards/jwt.guards';
import { GetUserProjectsResponseDto } from '../dto/response/getUser.response.dto';
import { UserService } from '../user.service';
import { Request } from 'express';

@Controller('user')
export class UserProjectsController {
  constructor(private userService: UserService) {}

  @Get('projects')
  @UseGuards(JwtGuard)
  async getUserProjects(
    @Req() req: Request,
  ): Promise<GetUserProjectsResponseDto> {
    const userId = req.user['userId'];
    return this.userService.getUserProjects(userId);
  }
}
