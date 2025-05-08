import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity('project')
export class ProjectsEntity {
  @PrimaryColumn({ name: 'id_project' })
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

  @Column({ name: 'manager' })
  manager: string;

  @ManyToMany(() => UserEntity, (user) => user.projects)
  user: UserEntity[];
}
