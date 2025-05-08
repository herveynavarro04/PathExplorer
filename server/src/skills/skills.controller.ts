import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/common/Guards/jwt.guards';
import { SkillsResponseDto } from './dto/response/skills.response.dto';
import { SkillsService } from './skills.service';

@Controller('skills')
export class SkillsController {
  constructor(private skillsService: SkillsService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getSkills(): Promise<SkillsResponseDto> {
    return this.skillsService.getSkills();
  }
}
