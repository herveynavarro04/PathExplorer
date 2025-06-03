import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/Guards/jwt.guards';
import { UpdateEmployeeRequestDto } from './dto/request/updateEmployee.request.dto';
import { GetEmployeeInfoResponseDto } from './dto/response/getEmployeeInfo.response.dto';
import { UpdateEmployeeResponseDto } from './dto/response/updateEmployee.response.dto';
import { EmployeeService } from './employee.service';
import { DeleteEmployeeResponseDto } from './dto/response/deleteEmployee.response.dto';
import { GetEmployeesListResponseDto } from './dto/response/getEmployeesList.response.dto';
import { GetAllEmployeesResponseDto } from './dto/response/getAllEmployees.response.dto';
import { UpdateEmployeeStatusResponseDto } from './dto/response/updateEmployeeStatus.response.dto';
import { UpdateEmployeeStatusRequestDto } from './dto/request/updateEmployeeStatus.request.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getEmployeeInfo(
    @Req() req: Request,
  ): Promise<GetEmployeeInfoResponseDto> {
    const employeeId = req.user['employeeId'];
    return this.employeeService.getEmployeeInfo(employeeId);
  }

  @Get('all')
  @UseGuards(JwtGuard)
  async getAllEmployees(): Promise<GetAllEmployeesResponseDto[]> {
    return this.employeeService.getAllEmployees();
  }

  @Patch()
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('pictureFile'))
  async updateEmployee(
    @Body() updatePayload: UpdateEmployeeRequestDto,
    @UploadedFile() file: Express.Multer.File | undefined,
    @Req() req: Request,
  ): Promise<UpdateEmployeeResponseDto> {
    const employeeId = req.user['employeeId'];
    return this.employeeService.updateEmployee(employeeId, updatePayload, file);
  }

  @Patch('delete/picture')
  @UseGuards(JwtGuard)
  async deleteProfilePicture(
    @Req() req: Request,
  ): Promise<DeleteEmployeeResponseDto> {
    const employeeId = req.user['employeeId'];
    return this.employeeService.deleteProfilePicture(employeeId);
  }

  @Get('available/employees')
  @UseGuards(JwtGuard)
  async getAvailableEmployees(
    @Req() req: Request,
  ): Promise<GetEmployeesListResponseDto> {
    const employeeId = req.user['employeeId'];
    return this.employeeService.getAvailableEmployees(employeeId);
  }

  @Get('manager/employees')
  @UseGuards(JwtGuard)
  async getManagerEmployees(
    @Req() req: Request,
  ): Promise<GetEmployeesListResponseDto> {
    const employeeId = req.user['employeeId'];
    return this.employeeService.getManagerEmployees(employeeId);
  }

  @Delete(':employeeId')
  @UseGuards(JwtGuard)
  async deleteEmployee(
    @Param('employeeId') employeeId: string,
  ): Promise<DeleteEmployeeResponseDto> {
    return this.employeeService.deleteEmployee(employeeId);
  }

  @Get(':employeeId')
  @UseGuards(JwtGuard)
  async getEmployeeInfoById(
    @Param('employeeId') employeeId: string,
  ): Promise<GetEmployeeInfoResponseDto> {
    return this.employeeService.getEmployeeInfo(employeeId);
  }

  @Patch(':employeeId/status')
  @UseGuards(JwtGuard)
  async updateEmployeeStatus(
    @Param('employeeId') employeeId: string,
    @Body() updatePayload: UpdateEmployeeStatusRequestDto,
  ): Promise<UpdateEmployeeStatusResponseDto> {
    return this.employeeService.updateEmployeeStatus(employeeId, updatePayload);
  }
}
