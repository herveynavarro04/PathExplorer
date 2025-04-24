import {
  Controller,
  Get,
  Req,
  UseGuards,
  Body,
  Post,
  Delete,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/Guards/jwt.guards';
import { Request } from 'express';
import { SkillsResponseDto } from 'src/auth/dto/response/skills.response.dto';
import { SkillsService } from '../services/skills.service';
import { UpdateUserSkillsRequestDto } from '../dto/request/postUserSkills.request.dto';
import { UpdateUserSkillsResponseDto } from '../dto/response/postUserSkills.response.dto';

@Controller('user/skills')
export class SkillsController {
  constructor(private skillsService: SkillsService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getSkills(): Promise<SkillsResponseDto> {
    return this.skillsService.getSkills();
  }

  @Get('get')
  @UseGuards(JwtGuard)
  async getUserSkills(@Req() req: Request): Promise<SkillsResponseDto> {
    const userId = req.user['userId'];
    return this.skillsService.getUserSkills(userId);
  }

  @Post('add')
  @UseGuards(JwtGuard)
  async postUserSkills(
    @Body() postSkillsPayload: UpdateUserSkillsRequestDto,
    @Req() req: Request,
  ): Promise<UpdateUserSkillsResponseDto> {
    const userId = req.user['userId'];
    return this.skillsService.postUserSkills(userId, postSkillsPayload);
  }

  @Delete('delete')
  @UseGuards(JwtGuard)
  async deleteUserSkills(
    @Body() postSkillsPayload: UpdateUserSkillsRequestDto,
    @Req() req: Request,
  ): Promise<UpdateUserSkillsResponseDto> {
    const userId = req.user['userId'];
    return this.skillsService.deleteUserSkills(userId, postSkillsPayload);
  }
}
