import { EmployeeEntity } from 'src/employee/entities/employee.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('feedback')
export class FeedbackEntity {
  @PrimaryColumn({ name: 'feedback_id' })
  feedbackId: string;

  @Column({ name: 'information' })
  information: string;

  @Column({ name: 'employee_id' })
  employeeId: string;

  @Column({ name: 'reviser_id' })
  reviserId: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => EmployeeEntity)
  @JoinColumn({ name: 'employee_id', referencedColumnName: 'employeeId' })
  employee?: EmployeeEntity;

  @ManyToOne(() => EmployeeEntity)
  @JoinColumn({ name: 'reviser_id', referencedColumnName: 'employeeId' })
  reviser?: EmployeeEntity;
}
