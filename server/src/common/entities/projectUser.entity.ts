import { ProjectsEntity } from 'src/projects/entities/projects.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('project_user')
export class ProjectUserEntity {
  @PrimaryColumn({ name: 'userid' })
  userId: string;

  @PrimaryColumn({ name: 'id_project' })
  projectId: string;

  @Column({ name: 'user_status' })
  userStatus: string;

  @Column({ name: 'chargeability' })
  chargeability: number;

  @ManyToOne(() => UserEntity, (user) => user.projectUserLink)
  @JoinColumn({ name: 'userid' })
  user: UserEntity;

  @ManyToOne(() => ProjectsEntity, (project) => project.userProjectLink)
  @JoinColumn({ name: 'id_project' })
  project: ProjectsEntity;
}
