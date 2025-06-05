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
import { CoursesService } from './service/courses.service';
import { JwtGuard } from 'src/auth/Guards/jwt.guards';
import { Request } from 'express';
import { PostCourseRequestDto } from './dto/request/postCourse.request';
import { PostCourseResponseDto } from './dto/response/postCourseResponse.dto';
import { employeeCoursesService } from './service/employeeCourses.service';
import { GetEmployeeCoursesDto } from './dto/response/getEmployeeCourses.dto';
import { GetCourseInfoDto } from './dto/response/getCourseInfo.dto';
import { UpdateEmployeeCourseResponseDto } from './dto/response/updateEmployeeCourse.response.dto';
import { UpdateEmployeeCourseRequestDto } from './dto/request/updateEmployeeCourse.request.dto';
@Controller('courses')
export class CoursesController {
  constructor(
    private coursesService: CoursesService,
    private employeeCourseService: employeeCoursesService,
  ) {}

  @Post()
  @UseGuards(JwtGuard)
  async postCourse(
    @Req() req: Request,
    @Body() postCoursePayload: PostCourseRequestDto,
  ): Promise<PostCourseResponseDto> {
    const employeeId = req.user['employeeId'];
    return this.coursesService.postCourse(employeeId, postCoursePayload);
  }

  @Get('employee')
  @UseGuards(JwtGuard)
  async getEmployeeCourses(
    @Req() req: Request,
  ): Promise<GetEmployeeCoursesDto> {
    const employeeId = req.user['employeeId'];
    return this.employeeCourseService.getEmployeeCourses(employeeId);
  }

  @Get('people-lead')
  @UseGuards(JwtGuard)
  async getPeopleLeadCourses(
    @Req() req: Request,
  ): Promise<GetEmployeeCoursesDto> {
    const employeeId = req.user['employeeId'];
    return this.coursesService.getPeopleLeadCourses(employeeId);
  }

  @Get(':courseId')
  @UseGuards(JwtGuard)
  async getCourseInfo(
    @Req() req: Request,
    @Param('courseId') courseId: string,
  ): Promise<GetCourseInfoDto> {
    const employeeId = req.user['employeeId'];
    return this.employeeCourseService.getCourseInfo(employeeId, courseId);
  }

  @Get('/PeopleLead/:courseId')
  @UseGuards(JwtGuard)
  async getCourseInfoGeneral(
    @Req() req: Request,
    @Param('courseId') courseId: string,
  ): Promise<GetCourseInfoDto> {
    const employeeId = req.user['employeeId'];
    return this.employeeCourseService.getCourseInfoGeneral(
      employeeId,
      courseId,
    );
  }

  @Patch('update/:courseId')
  @UseGuards(JwtGuard)
  async completeCourse(
    @Req() req: Request,
    @Param('courseId') courseId: string,
    @Body() status: UpdateEmployeeCourseRequestDto,
  ): Promise<UpdateEmployeeCourseResponseDto> {
    const employeeId = req.user['employeeId'];
    return this.employeeCourseService.completeCourse(
      courseId,
      employeeId,
      status,
    );
  }
}
