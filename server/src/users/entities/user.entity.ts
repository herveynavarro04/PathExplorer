import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { SkillsEntity } from 'src/skills/entities/skills.entity';
import { IsOptional } from 'class-validator';
import { ProjectUserEntity } from 'src/common/entities/projectUser.entity';

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

  @OneToMany(() => ProjectUserEntity, (link) => link.user)
  projectLinks: ProjectUserEntity[];
}
