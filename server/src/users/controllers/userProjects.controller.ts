import { Controller, Get, UseGuards, Req, Patch, Body } from '@nestjs/common';
import { JwtGuard } from 'src/common/Guards/jwt.guards';
import { Request } from 'express';
import { UpdateUserProjectsRequestDto } from '../dto/request/updateUserProjects.request.dto';
import { UpdateUserProjectsResponseDto } from '../dto/response/updateUserProjects.response.dto';
import { UserProjectsService } from '../services/userProjects.service';
import { GetUserProjectsResponseDto } from '../dto/response/getUser.response.dto';

@Controller('user/projects')
export class UserProjectsController {
  constructor(private userProjectsService: UserProjectsService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getUserProjects(
    @Req() req: Request,
  ): Promise<GetUserProjectsResponseDto> {
    const userId = req.user['userId'];
    return this.userProjectsService.getUserProjects(userId);
  }

  @Patch()
  @UseGuards(JwtGuard)
  async updateUserProjects(
    @Body() updatePayload: UpdateUserProjectsRequestDto,
    @Req() req: Request,
  ): Promise<UpdateUserProjectsResponseDto> {
    const userId = req.user['userId'];
    return this.userProjectsService.updateUserProjects(userId, updatePayload);
  }
}
