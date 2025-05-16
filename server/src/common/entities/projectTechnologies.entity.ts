import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { ProjectsEntity } from 'src/projects/entities/projects.entity';
import { TechnologiesEntity } from './technology.entity';

@Entity('project_technologies')
export class ProjectTechnologyEntity {
  @PrimaryColumn({ name: 'project_id', type: 'varchar' })
  projectId: string;

  @PrimaryColumn({ name: 'technology_id', type: 'varchar' })
  technologyId: string;

  @Column({ name: 'created_at', type: 'date' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'date', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => ProjectsEntity, (project) => project.projectTechnologyLink, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: ProjectsEntity;

  @ManyToOne(() => TechnologiesEntity, (tech) => tech.projectTechnologyLink, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'technology_id' })
  technology: TechnologiesEntity;
}
