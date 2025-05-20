import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('goal')
export class GoalsEntity {
  @PrimaryColumn({ name: 'goal_id' })
  goalId: string;

  @Column({ name: 'information' })
  information: string;

  @Column({ name: 'term' })
  term: Date;

  @Column({ name: 'completed' })
  completed: boolean;

  @Column({ name: 'status' })
  status: string;

  @Column({ name: 'employee_id' })
  employeeId: string;

  @Column({ name: 'reviser_id' })
  reviserId: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;
}
