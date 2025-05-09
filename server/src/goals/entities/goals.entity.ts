import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('goal')
export class GoalsEntity {
  @PrimaryColumn({ name: 'id_goal' })
  goalId: string;

  @Column({ name: 'information' })
  information: string;

  @Column({ name: 'term' })
  term: Date;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @Column({ name: 'completed' })
  completed: boolean;

  @Column({ name: 'validated' })
  validated: boolean;

  @Column({ name: 'userid' })
  userId: string;

  @Column({ name: 'id_reviser' })
  reviserId: string;
}
