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

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CoursesEntity)
    private coursesRepository: Repository<CoursesEntity>,
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
      this.coursesRepository.save(newCourse);
      Logger.log('Course created succesfully', 'CourseService');
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
}
