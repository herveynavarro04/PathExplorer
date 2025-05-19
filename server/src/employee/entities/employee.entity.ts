import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { IsOptional } from 'class-validator';
import { EmployeeSkillEntity } from 'src/common/entities/employeeSkills.entity';
import { EmployeeInterestEntity } from 'src/common/entities/employeeInterests.entity';
import { EmployeeProjectEntity } from 'src/common/entities/employeeProject.entity';
import { EmployeeCoursesEntity } from 'src/common/entities/employeeCourses.entity';

@Entity('employee')
export class EmployeeEntity {
  @PrimaryColumn({ name: 'employee_id' })
  employeeId: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'rol' })
  rol: string;

  @Column({ name: 'img_buffer' })
  imgUrl: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => EmployeeProjectEntity, (link) => link.employee, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @IsOptional()
  employeeProjectLink?: EmployeeProjectEntity[];

  @OneToMany(() => EmployeeSkillEntity, (link) => link.employee, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @IsOptional()
  employeeSkillLink?: EmployeeSkillEntity[];

  @OneToMany(() => EmployeeInterestEntity, (link) => link.employee, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @IsOptional()
  employeeInterestLink?: EmployeeInterestEntity[];

  @OneToMany(() => EmployeeCoursesEntity, (link) => link.employee, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @IsOptional()
  employeeCoursesLink?: EmployeeCoursesEntity[];
}
