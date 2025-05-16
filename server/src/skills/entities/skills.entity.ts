import { EmployeeSkillEntity } from 'src/common/entities/employeeSkills.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('skills')
export class SkillsEntity {
  @PrimaryColumn({ name: 'skill_id' })
  skillId: string;

  @Column({ name: 'skill_name' })
  skillName: string;

  @Column({ name: 'skill_type' })
  skillType: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => EmployeeSkillEntity, (link) => link.skill, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  employeeSkillLink?: EmployeeSkillEntity[];
}
