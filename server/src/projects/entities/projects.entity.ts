import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ProjectTechnologyEntity } from 'src/common/entities/projectTechnologies.entity';
import { EmployeeProjectEntity } from 'src/common/entities/employeeProject.entity';

@Entity('project')
export class ProjectsEntity {
  @PrimaryColumn({ name: 'project_id' })
  projectId: string;

  @Column({ name: 'project_name' })
  projectName: string;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @Column({ name: 'project_type' })
  projectType: string;

  @Column({ name: 'client' })
  client: string;

  @Column({ name: 'active' })
  active: boolean;

  @Column({ name: 'information' })
  information: string;

  @Column({ name: 'full' })
  full: boolean;

  @Column({ name: 'limit_employees' })
  limitEmployees: number;

  @Column({ name: 'manager_id' })
  managerId: string;

  @Column({ name: 'created_at' })
  createdAt: string;

  @Column({ name: 'updated_at' })
  updatedAt: string;

  @Column({ name: 'progress' })
  progress: number;

  @OneToMany(() => EmployeeProjectEntity, (link) => link.project, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  employeeProjectLink?: EmployeeProjectEntity[];

  @OneToMany(() => ProjectTechnologyEntity, (link) => link.project)
  projectTechnologyLink?: ProjectTechnologyEntity[];
}
