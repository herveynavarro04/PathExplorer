import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('history')
export class HistoryEntity {
  @PrimaryColumn({ name: 'id_history' })
  historyId: string;

  @Column({ name: 'information' })
  information: string;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @Column({ name: 'position' })
  position: string;

  @Column({ name: 'company' })
  company: string;

  @Column({ name: 'userid' })
  userId: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;
}
