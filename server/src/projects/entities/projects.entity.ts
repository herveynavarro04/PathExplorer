import { IsOptional } from 'class-validator';
import { TechnologiesEntity } from 'src/common/entities/technologies.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

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

  @ManyToMany(() => TechnologiesEntity, (technologies) => technologies.project)
  @IsOptional()
  @JoinTable({
    name: 'project_technologies',
    joinColumn: {
      name: 'id_project',
      referencedColumnName: 'projectId',
    },
    inverseJoinColumn: {
      name: 'id_technology',
      referencedColumnName: 'technologyId',
    },
  })
  technologies: TechnologiesEntity[];
}
