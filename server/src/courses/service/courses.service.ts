import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { PostCourseRequestDto } from '../dto/request/postCourse.request';
import { PostCourseResponseDto } from '../dto/response/postCourseResponse.dto';
import { CoursesEntity } from '../entity/courses.entity';
import { employeeCoursesService } from './employeeCourses.service';
import { GetEmployeeCoursesDto } from '../dto/response/getEmployeeCourses.dto';
import { GetCourseInfoDto } from '../dto/response/getCourseInfo.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CoursesEntity)
    private coursesRepository: Repository<CoursesEntity>,
    private employeeCourseService: employeeCoursesService,
  ) {}

  async postCourse(
    employeeId: string,
    newCoursePayload: PostCourseRequestDto,
  ): Promise<PostCourseResponseDto> {
    try {
      const courseId = uuidv4();
      const newCourse: CoursesEntity = {
        courseId: courseId,
        employeeId: employeeId,
        createdAt: new Date(),
        updatedAt: null,
        ...newCoursePayload,
      };
      await this.coursesRepository.save(newCourse);
      Logger.log('Course created succesfully', 'CourseService');
      if (newCoursePayload.employeesAssigned) {
        await this.employeeCourseService.assignEmployeesCourse(
          newCoursePayload.employeesAssigned,
          courseId,
        );
      }
      return {
        courseId: courseId,
        createdAt: new Date(),
      };
    } catch (error) {
      Logger.error(
        'Error during course registration',
        error.stack,
        'CourseService',
      );
      throw new InternalServerErrorException('Failed to create course');
    }
  }

  async getCourseInfoById(
    employeeId: string,
    courseId: string,
  ): Promise<GetCourseInfoDto> {
    try {
      const course = await this.coursesRepository.findOne({
        where: { courseId, employeeId },
      });

      if (!course) {
        throw new InternalServerErrorException('Course not found');
      }

      const courseInfo: GetCourseInfoDto = {
        title: course.title,
        duration: course.duration,
        information: course.information,
        status: false,
        url: course.url,
        mandatory: course.mandatory,
        createdAt: course.createdAt,
      };
      Logger.log('General course info successfully fetched', 'CoursesService');
      return courseInfo;
    } catch (error) {
      Logger.error(
        'Error during general course info fetching',
        error.stack,
        'CoursesService',
      );
      throw new InternalServerErrorException('Failed to fetch course info');
    }
  }

  async getPeopleLeadCourses(
    employeeId: string,
  ): Promise<GetEmployeeCoursesDto> {
    try {
      const courseInfo = await this.coursesRepository.find({
        where: { employeeId: employeeId },
        select: ['courseId', 'title', 'information', 'mandatory'],
      });

      const courses = courseInfo.map((link) => ({
        courseId: link.courseId,
        title: link.title,
        information: link.title,
        mandatory: link.mandatory,
      }));
      Logger.log('PeopleLead courses succesfully fetched', 'CourseService');
      return {
        courses: courses,
      };
    } catch (error) {
      Logger.error(
        'Error during PeopleLead courses fetching',
        error.stack,
        'CourseService',
      );
      throw new InternalServerErrorException('Failed to fetch courses');
    }
  }
}
