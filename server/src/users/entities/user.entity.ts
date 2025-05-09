import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { SkillsEntity } from 'src/skills/entities/skills.entity';
import { IsOptional } from 'class-validator';
import { ProjectsEntity } from 'src/projects/entities/projects.entity';

@Entity('User')
export class UserEntity {
  @PrimaryColumn({ name: 'userid' })
  userId: string;

  @Column({ name: 'email' })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'imgurl' })
  imgUrl: string;

  @Column({ name: 'firstname' })
  firstName: string;

  @Column({ name: 'lastname' })
  lastName: string;

  @ManyToMany(() => SkillsEntity, (skill) => skill.user)
  @IsOptional()
  @JoinTable({
    name: 'user_skills',
    joinColumn: {
      name: 'userid',
      referencedColumnName: 'userId',
    },
    inverseJoinColumn: {
      name: 'id_skill',
      referencedColumnName: 'skillId',
    },
  })
  skills: SkillsEntity[];

  @ManyToMany(() => SkillsEntity, (skill) => skill.user)
  @IsOptional()
  @JoinTable({
    name: 'user_interests',
    joinColumn: {
      name: 'userid',
      referencedColumnName: 'userId',
    },
    inverseJoinColumn: {
      name: 'id_skill',
      referencedColumnName: 'skillId',
    },
  })
  interests: SkillsEntity[];

  @ManyToMany(() => ProjectsEntity, (projets) => projets.user)
  @IsOptional()
  @JoinTable({
    name: 'project_user',
    joinColumn: {
      name: 'userid',
      referencedColumnName: 'userId',
    },
    inverseJoinColumn: {
      name: 'id_project',
      referencedColumnName: 'projectId',
    },
  })
  projects: ProjectsEntity[];
}
