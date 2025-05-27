import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/common/Guards/jwt.guards';
import { SkillsResponseDto } from './dto/response/skills.response.dto';
import { SkillsService } from './service/skills.service';
import { EmployeeSkillsService } from './service/employeeSkillsService.service';
import { UpdateEmployeeSkillsRequestDto } from './dto/request/updateEmployeeSkills.request.dto';
import { UpdateEmployeeSkillsResponseDto } from './dto/response/updateEmployeeSkills.response.dto';
import { Request } from 'express';

@Controller('skills')
export class SkillsController {
  constructor(
    private skillsService: SkillsService,
    private employeeSkillsService: EmployeeSkillsService,
  ) {}

  @Get()
  @UseGuards(JwtGuard)
  async getSkills(): Promise<SkillsResponseDto> {
    return this.skillsService.getSkills();
  }

  @Get('employee')
  @UseGuards(JwtGuard)
  async getEmployeeSkills(@Req() req: Request): Promise<SkillsResponseDto> {
    const employeeId = req.user['employeeId'];
    return this.employeeSkillsService.getEmployeeSkills(employeeId);
  }

  @Patch('employee')
  @UseGuards(JwtGuard)
  async patchemployeeSkills(
    @Body() updateSkillsPayload: UpdateEmployeeSkillsRequestDto,
    @Req() req: Request,
  ): Promise<UpdateEmployeeSkillsResponseDto> {
    const employeeId = req.user['employeeId'];
    return this.employeeSkillsService.updateEmployeeSkills(
      employeeId,
      updateSkillsPayload,
    );
  }

  @Get('employee/interests')
  @UseGuards(JwtGuard)
  async getemployeeInterests(@Req() req: Request): Promise<SkillsResponseDto> {
    const employeeId = req.user['employeeId'];
    return this.employeeSkillsService.getEmployeeSkillsInterests(employeeId);
  }

  @Patch('employee/interests')
  @UseGuards(JwtGuard)
  async patchemployeeSkillsInterests(
    @Body() updateSkillsPayload: UpdateEmployeeSkillsRequestDto,
    @Req() req: Request,
  ): Promise<UpdateEmployeeSkillsResponseDto> {
    const employeeId = req.user['employeeId'];
    return this.employeeSkillsService.updateEmployeeSkillsInterests(
      employeeId,
      updateSkillsPayload,
    );
  }

  @Get(':employeeId')
  @UseGuards(JwtGuard)
  async getEmployeeSkillsById(
    @Param('employeeId') employeeId: string,
  ): Promise<SkillsResponseDto> {
    return this.employeeSkillsService.getEmployeeSkills(employeeId);
  }
}
