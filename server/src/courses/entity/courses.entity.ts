import { IsOptional } from 'class-validator';
import { EmployeeCoursesEntity } from 'src/common/entities/employeeCourses.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('course')
export class CoursesEntity {
  @PrimaryColumn({ name: 'course_id' })
  courseId: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'duration' })
  duration: string;

  @Column({ name: 'information' })
  information: string;

  @Column({ name: 'employee_id' })
  employeeId: string;

  @Column({ name: 'url' })
  url: string;

  @Column({ name: 'mandatory' })
  mandatory: boolean;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => EmployeeCoursesEntity, (link) => link.course, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @IsOptional()
  employeeCoursesLink?: EmployeeCoursesEntity[];
}
