import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './service/courses.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { CoursesEntity } from './entity/courses.entity';
import { employeeCoursesService } from './service/employeeCourses.service';
import { EmployeeCoursesEntity } from 'src/common/entities/employeeCourses.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CoursesEntity, EmployeeCoursesEntity])],
  controllers: [CoursesController],
  providers: [CoursesService, employeeCoursesService],
})
export class CoursesModule {}
