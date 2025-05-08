import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/common/Guards/jwt.guards';
import { SkillsResponseDto } from 'src/skills/dto/response/skills.response.dto';
import { UpdateUserSkillsRequestDto } from '../dto/request/postUserSkills.request.dto';
import { UpdateUserSkillsResponseDto } from '../dto/response/postUserSkills.response.dto';
import { Request } from 'express';
import { UserSkillsService } from '../services/userSkills.service';

@Controller('user')
export class UserSkillsController {
  constructor(private userSkillsService: UserSkillsService) {}

  @Get('skills')
  @UseGuards(JwtGuard)
  async getUserSkills(@Req() req: Request): Promise<SkillsResponseDto> {
    const userId = req.user['userId'];
    return this.userSkillsService.getUserSkills(userId);
  }

  @Patch('skills')
  @UseGuards(JwtGuard)
  async postUserSkills(
    @Body() updateSkillsPayload: UpdateUserSkillsRequestDto,
    @Req() req: Request,
  ): Promise<UpdateUserSkillsResponseDto> {
    const userId = req.user['userId'];
    return this.userSkillsService.updateUserSkills(userId, updateSkillsPayload);
  }
}
