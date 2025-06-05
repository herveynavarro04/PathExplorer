import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { EmployeeEntity } from 'src/employee/entities/employee.entity';

@Entity('people_lead')
export class PeopleLeadEntity {
  @PrimaryColumn({ name: 'employee_id' })
  employeeId: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at', nullable: true })
  updatedAt?: Date;

  @Column({ name: 'validation_date', nullable: true })
  validationDate?: Date;

  @Column({ name: 'status' })
  status: string;

  @OneToOne(() => EmployeeEntity)
  @JoinColumn({ name: 'employee_id' })
  employee: EmployeeEntity;
}
