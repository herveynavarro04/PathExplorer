import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('history')
export class HistoryEntity {
  @PrimaryColumn({ name: 'history_id' })
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

  @Column({ name: 'employee_id' })
  employeeId: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;
}
