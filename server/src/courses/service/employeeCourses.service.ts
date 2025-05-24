import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeCoursesEntity } from 'src/common/entities/employeeCourses.entity';
import { GetEmployeeCoursesDto } from '../dto/response/getEmployeeCourses.dto';
import { GetCourseInfoDto } from '../dto/response/getCourseInfo.dto';
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

      Logger.log(courseInfo);

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
}
