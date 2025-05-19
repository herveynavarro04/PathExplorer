import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/common/Guards/jwt.guards';
import { DeleteEmployeeResponseDto } from '../dto/response/deleteEmployee.response.dto';
import { UpdateEmployeeResponseDto } from '../dto/response/updateEmployee.response.dto';
import { GetEmployeeInfoResponseDto } from '../dto/response/getEmployeeInfo.response.dto';
import { UpdateEmployeeRequestDto } from '../dto/request/updateEmployee.request.dto';
import { Request } from 'express';
import { EmployeeService } from '../services/employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getemployee(@Req() req: Request): Promise<GetEmployeeInfoResponseDto> {
    const employeeId = req.user['employeeId'];
    return this.employeeService.getEmployeeInfo(employeeId);
  }

  @Patch()
  @UseGuards(JwtGuard)
  async updateemployee(
    @Body() updatePayload: UpdateEmployeeRequestDto,
    @Req() req: Request,
  ): Promise<UpdateEmployeeResponseDto> {
    const employeeId = req.user['employeeId'];
    return this.employeeService.updateEmployee(employeeId, updatePayload);
  }

  @Delete(':employeeId')
  @UseGuards(JwtGuard)
  async deleteemployee(
    @Param('employeeId') employeeId: string,
  ): Promise<DeleteEmployeeResponseDto> {
    return this.employeeService.deleteEmployee(employeeId);
  }
}
