import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/common/Guards/jwt.guards';
import { SkillsResponseDto } from 'src/skills/dto/response/skills.response.dto';
import { UpdateUserSkillsRequestDto } from '../dto/request/postUserSkills.request.dto';
import { UpdateUserSkillsResponseDto } from '../dto/response/postUserSkills.response.dto';
import { Request } from 'express';
import { UserSkillsService } from '../services/userSkills.service';

@Controller('user/skills')
export class UserSkillsController {
  constructor(private userSkillsService: UserSkillsService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getUserSkills(@Req() req: Request): Promise<SkillsResponseDto> {
    const userId = req.user['userId'];
    return this.userSkillsService.getUserSkills(userId);
  }

  @Patch()
  @UseGuards(JwtGuard)
  async patchUserSkills(
    @Body() updateSkillsPayload: UpdateUserSkillsRequestDto,
    @Req() req: Request,
  ): Promise<UpdateUserSkillsResponseDto> {
    const userId = req.user['userId'];
    return this.userSkillsService.updateUserSkills(userId, updateSkillsPayload);
  }

  @Get('/interests')
  @UseGuards(JwtGuard)
  async getUserInterests(@Req() req: Request): Promise<SkillsResponseDto> {
    const userId = req.user['userId'];
    return this.userSkillsService.getUserSkillsInterests(userId);
  }

  @Patch('/interests')
  @UseGuards(JwtGuard)
  async patchUserSkillsInterests(
    @Body() updateSkillsPayload: UpdateUserSkillsRequestDto,
    @Req() req: Request,
  ): Promise<UpdateUserSkillsResponseDto> {
    const userId = req.user['userId'];
    return this.userSkillsService.updateUserSkillsInterests(
      userId,
      updateSkillsPayload,
    );
  }
}
