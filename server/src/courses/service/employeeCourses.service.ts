import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeCoursesEntity } from 'src/common/entities/employeeCourses.entity';
import { Repository } from 'typeorm';
import { GetCourseInfoDto } from '../dto/response/getCourseInfo.dto';
import { GetEmployeeCoursesDto } from '../dto/response/getEmployeeCourses.dto';
import { UpdateEmployeeCourseResponseDto } from '../dto/response/updateEmployeeCourse.response.dto';
import { UpdateEmployeeCourseRequestDto } from '../dto/request/updateEmployeeCourse.request.dto';
@Injectable()
export class employeeCoursesService {
  constructor(
    @InjectRepository(EmployeeCoursesEntity)
    private employeeCoursesRepository: Repository<EmployeeCoursesEntity>,
  ) {}

  async getEmployeeCourses(employeeId: string): Promise<GetEmployeeCoursesDto> {
    try {
      const employeeCourses = await this.employeeCoursesRepository.find({
        where: { employeeId: employeeId },
        relations: ['employee', 'course'],
      });

      const courses = employeeCourses.map((employeeCoursesLink) => ({
        title: employeeCoursesLink.course.title,
        status: employeeCoursesLink.status,
        information: employeeCoursesLink.course.information,
        courseId: employeeCoursesLink.courseId,
        mandatory: employeeCoursesLink.course.mandatory,
      }));
      Logger.log(
        'Employee courses succesfully fetched',
        'EmployeeEmployeeCoursesService',
      );
      return {
        courses: courses,
      };
    } catch (error) {
      Logger.error(
        'Error during course fetching',
        error.stack,
        'EmployeeCoursesService',
      );
      throw new InternalServerErrorException(
        'Failed to fetch employee courses',
      );
    }
  }

  async getCourseInfo(
    employeeId: string,
    courseId: string,
  ): Promise<GetCourseInfoDto> {
    try {
      const employeeCoursesLink = await this.employeeCoursesRepository.findOne({
        where: { employeeId, courseId },
        relations: ['employee', 'course'],
      });

      if (!employeeCoursesLink) {
        throw new InternalServerErrorException('Course not found');
      }

      const courseInfo: GetCourseInfoDto = {
        title: employeeCoursesLink.course.title,
        duration: employeeCoursesLink.course.duration,
        information: employeeCoursesLink.course.information,
        status: employeeCoursesLink.status,
        url: employeeCoursesLink.course.url,
        mandatory: employeeCoursesLink.course.mandatory,
        createdAt: employeeCoursesLink.course.createdAt,
      };
      Logger.log(
        'Course info succesfully fetched',
        'EmployeeEmployeeCoursesService',
      );
      return courseInfo;
    } catch (error) {
      Logger.error(
        'Error during course info fetching',
        error.stack,
        'EmployeeCoursesService',
      );
      throw new InternalServerErrorException('Failed to fetch course info');
    }
  }

  public async assignEmployeesCourse(
    employeeArray: string[],
    courseId: string,
  ): Promise<void> {
    try {
      const employeeCourses = employeeArray.map((employeeId) => ({
        employeeId,
        courseId,
      }));
      await this.employeeCoursesRepository.save(employeeCourses);
    } catch (error) {
      Logger.error(
        'Error during assigning employees to course',
        error.stack,
        'EmployeeCoursesService',
      );
      throw new InternalServerErrorException(
        'Failed to assign employees to course',
      );
    }
  }

  async completeCourse(
    courseId: string,
    employeeId: string,
    updateStatusPayload: UpdateEmployeeCourseRequestDto,
  ): Promise<UpdateEmployeeCourseResponseDto> {
    try {
      await this.employeeCoursesRepository.update(
        { employeeId: employeeId, courseId: courseId },
        { status: updateStatusPayload.status, updatedAt: new Date() },
      );
      Logger.log(
        'Employee courses succesfully updated',
        'EmployeeEmployeeCoursesService',
      );
      return {
        courseId: courseId,
        updatedAt: new Date(),
      };
    } catch (error) {
      Logger.error(
        'Error during employee course update',
        error.stack,
        'EmployeeCoursesService',
      );
      throw new InternalServerErrorException(
        'Failed to update employee course',
      );
    }
  }
}
