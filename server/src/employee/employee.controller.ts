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
import { JwtGuard } from 'src/common/Guards/jwt.guards';
import { Request } from 'express';
import { GetEmployeeInfoResponseDto } from './dto/response/getEmployeeInfo.response.dto';
import { UpdateEmployeeRequestDto } from './dto/request/updateEmployee.request.dto';
import { DeleteEmployeeResponseDto } from './dto/response/deleteEmployee.response.dto';
import { UpdateEmployeeResponseDto } from './dto/response/updateEmployee.response.dto';
import { EmployeeService } from './employee.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getEmployee(@Req() req: Request): Promise<GetEmployeeInfoResponseDto> {
    const employeeId = req.user['employeeId'];
    return this.employeeService.getEmployeeInfo(employeeId);
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

  @Delete(':employeeId')
  @UseGuards(JwtGuard)
  async deleteEmployee(
    @Param('employeeId') employeeId: string,
  ): Promise<DeleteEmployeeResponseDto> {
    return this.employeeService.deleteEmployee(employeeId);
  }
}
