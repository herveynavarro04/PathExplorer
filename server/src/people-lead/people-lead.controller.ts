import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/Guards/jwt.guards';
import { PostPeopleLeadApplicationResponseDto } from './dto/response/postPeopleLeadApplication.response.dto';
import { PeopleLeadService } from './people-lead.service';
import { Request } from 'express';
import { GetPeopleLeadEmployeesResponseDto } from './dto/response/getPeopleLeadEmployees.response.dto';
import { GetPeopleLeadApplicants } from './dto/response/getPeopleLeadApplicants.response.dto';
import { UpdatePeopleLeadApplicationStatusRequestDto } from './dto/request/updatePeopleLeadApplicationStatus.request.dto';
import { UpdatePeopleLeadApplicationStatusResponseDto } from './dto/response/updatePeopleLeadApplicationStatus.response.dto';

@Controller('people-lead')
export class PeopleLeadController {
  constructor(private peopleLeadService: PeopleLeadService) {}
  @Post()
  @UseGuards(JwtGuard)
  async postPeopleLeadApplication(
    @Req() req: Request,
  ): Promise<PostPeopleLeadApplicationResponseDto> {
    const employeeId = req.user['employeeId'];
    return this.peopleLeadService.postPeopleLeadApplication(employeeId);
  }

  @Get('applicants')
  @UseGuards(JwtGuard)
  async getPeopleLeadApplicants(): Promise<GetPeopleLeadApplicants[]> {
    return this.peopleLeadService.getPeopleLeadApplicants();
  }

  // @Get()
  // @JwtGuard(JwtGuard)
  // async getAvailableEmployees(): Promise<>

  @Patch(':peopleLeadId')
  @UseGuards(JwtGuard)
  async updatePeopleLeadApplicationStatus(
    @Req() req: Request,
    @Param('peopleLeadId') employeeId: string,
    @Body() updatePayload: UpdatePeopleLeadApplicationStatusRequestDto,
  ): Promise<UpdatePeopleLeadApplicationStatusResponseDto> {
    return this.peopleLeadService.updatePeopleLeadApplicationStatus(
      employeeId,
      updatePayload,
    );
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
