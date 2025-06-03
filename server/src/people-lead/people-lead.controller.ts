import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/Guards/jwt.guards';
import { PostPeopleLeadApplicationResponseDto } from './dto/response/postPeopleLeadApplication.response.dto';
import { PeopleLeadService } from './people-lead.service';
import { Request } from 'express';
import { GetPeopleLeadEmployeesResponseDto } from './dto/response/getPeopleLeadEmployees.response.dto';

@Controller('people-lead')
export class PeopleLeadController {
  constructor(private peopleLeadService: PeopleLeadService) {}
  @Post('')
  @UseGuards(JwtGuard)
  async postPeopleLeadApplication(
    @Req() req: Request,
  ): Promise<PostPeopleLeadApplicationResponseDto> {
    const employeeId = req.user['employeeId'];
    return this.peopleLeadService.postPeopleLeadApplication(employeeId);
  }

  @Get('employees')
  @UseGuards(JwtGuard)
  async getPeopleLeadEmployees(
    @Req() req: Request,
  ): Promise<GetPeopleLeadEmployeesResponseDto[]> {
    const employeeId = req.user['employeeId'];
    return this.peopleLeadService.getPeopleLeadEmployees(employeeId);
  }
}
