import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { ProjectsEntity } from 'src/projects/entities/projects.entity';

@Entity('technologies')
export class TechnologiesEntity {
  @PrimaryColumn({ name: 'id_technology' })
  technologyId: string;

  @Column({ name: 'technology_name' })
  technologyName: string;

  @ManyToMany(() => ProjectsEntity, (project) => project.technologies)
  projects: ProjectsEntity[];
}
