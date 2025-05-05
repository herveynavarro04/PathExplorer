import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user.service';
import { JwtGuard } from 'src/auth/Guards/jwt.guards';
import { SkillsResponseDto } from 'src/skills/dto/response/skills.response.dto';
import { UpdateUserSkillsRequestDto } from '../dto/request/postUserSkills.request.dto';
import { UpdateUserSkillsResponseDto } from '../dto/response/postUserSkills.response.dto';
import { Request } from 'express';

<<<<<<< HEAD:server/src/users/controllers/userSkills.controller.ts
@Controller('user')
export class UserSkillsController {
  constructor(private userService: UserService) {}

  @Get('skills')
=======
@Controller('user/skills')
export class SkillsController {
  constructor(private skillsService: SkillsService) {}
  @Get()
  @UseGuards(JwtGuard)
  async getSkills(): Promise<SkillsResponseDto> {
    return this.skillsService.getSkills();
  }

  @Get('get')
>>>>>>> de93d3fae43b8b4eca4144cad4aaf4bb0538626f:server/src/users/controllers/skills.controller.ts
  @UseGuards(JwtGuard)
  async getUserSkills(@Req() req: Request): Promise<SkillsResponseDto> {
    const userId = req.user['userId'];
    return this.userService.getUserSkills(userId);
  }

  @Post('skills')
  @UseGuards(JwtGuard)
  async postUserSkills(
    @Body() postSkillsPayload: UpdateUserSkillsRequestDto,
    @Req() req: Request,
  ): Promise<UpdateUserSkillsResponseDto> {
    const userId = req.user['userId'];
    return this.userService.postUserSkills(userId, postSkillsPayload);
  }

<<<<<<< HEAD:server/src/users/controllers/userSkills.controller.ts
  @Delete('skills')
=======
  @Post('delete')
>>>>>>> de93d3fae43b8b4eca4144cad4aaf4bb0538626f:server/src/users/controllers/skills.controller.ts
  @UseGuards(JwtGuard)
  async deleteUserSkills(
    @Body() postSkillsPayload: UpdateUserSkillsRequestDto,
    @Req() req: Request,
  ): Promise<UpdateUserSkillsResponseDto> {
    const userId = req.user['userId'];
    return this.userService.deleteUserSkills(userId, postSkillsPayload);
  }
}
