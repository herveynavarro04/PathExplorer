import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ProjectTechnologyEntity } from './projectTechnologies.entity';

@Entity('technologies')
export class TechnologiesEntity {
  @PrimaryColumn({ name: 'technology_id' })
  technologyId: string;

  @Column({ name: 'technology_name' })
  technologyName: string;

  @Column({ name: 'created_at', type: 'date' })
  createdAt: Date;

  @OneToMany(() => ProjectTechnologyEntity, (link) => link.technology)
  projectTechnologyLink: ProjectTechnologyEntity[];
}
