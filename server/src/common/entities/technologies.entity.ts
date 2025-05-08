import { ProjectsEntity } from 'src/projects/entities/projects.entity';
import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity('technologies')
export class TechnologiesEntity {
  @PrimaryColumn({ name: 'id_technology' })
  technologyId: string;

  @Column({ name: 'technology_name' })
  technologyName: string;

  @ManyToMany(() => ProjectsEntity, (project) => project.technologies)
  project: ProjectsEntity[];
}
