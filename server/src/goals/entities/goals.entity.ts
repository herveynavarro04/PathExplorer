import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('goal')
export class GoalsEntity {
  @PrimaryColumn({ name: 'id_goal' })
  goalId: string;

  @Column({ name: 'information' })
  information: string;

  @Column({ name: 'term' })
  term: Date;

  @Column({ name: 'completed' })
  completed: boolean;

  @Column({ name: 'validated' })
  validated: boolean;

  @Column({ name: 'userid' })
  userId: string;

  @Column({ name: 'id_reviser' })
  reviserId: string;

  @Column({ name: 'created_at' })
  createdAt: Date;
}
