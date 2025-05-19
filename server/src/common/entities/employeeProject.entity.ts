import { ProjectsEntity } from 'src/projects/entities/projects.entity';
import { EmployeeEntity } from 'src/employee/entities/employee.entity';
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('employee_project')
export class EmployeeProjectEntity {
  @PrimaryColumn({ name: 'employee_id' })
  employeeId: string;

  @PrimaryColumn({ name: 'project_id' })
  projectId: string;

  @Column({ name: 'status' })
  status: string;

  @Column({ name: 'position' })
  position: string;

  @Column({ name: 'chargeability', type: 'int' })
  chargeability: number;

  @Column({ name: 'applied_at' })
  appliedAt: Date;

  @Column({ name: 'validated_at' })
  validatedAt: Date;

  @ManyToOne(() => EmployeeEntity, (employee) => employee.employeeProjectLink, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'employee_id' })
  employee?: EmployeeEntity;

  @ManyToOne(() => ProjectsEntity, (project) => project.employeeProjectLink, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project?: ProjectsEntity;
}
