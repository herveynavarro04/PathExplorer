import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity('skills')
export class SkillsEntity {
  @PrimaryColumn({ name: 'id_skill' })
  skillId: string;

  @Column({ name: 'skill_name' })
  skillName: string;

  @Column({ name: 'skill_type' })
  skillType: string;

  @ManyToMany(() => UserEntity, (user) => user.skills)
  user: UserEntity[];
}
