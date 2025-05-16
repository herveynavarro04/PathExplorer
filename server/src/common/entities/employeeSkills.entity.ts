import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { SkillsEntity } from 'src/skills/entities/skills.entity';
import { EmployeeEntity } from 'src/employee/entities/employee.entity';

@Entity('employee_skills')
export class EmployeeSkillEntity {
  @PrimaryColumn({ name: 'employee_id' })
  employeeId: string;

  @PrimaryColumn({ name: 'skill_id' })
  skillId: string;

  @Column({ name: 'created_at', type: 'date' })
  createdAt: Date;

  @ManyToOne(() => EmployeeEntity, (employee) => employee.employeeSkillLink, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'employee_id' })
  employee?: EmployeeEntity;

  @ManyToOne(() => SkillsEntity, (skill) => skill.employeeSkillLink, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'skill_id' })
  skill?: SkillsEntity;
}
