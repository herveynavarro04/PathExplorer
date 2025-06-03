import { EmployeeEntity } from 'src/employee/entities/employee.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('people_lead')
export class PeopleLeadEntity {
  @PrimaryColumn({ name: 'employee_id' })
  employeeId: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: string;

  @Column({ name: 'validation_date' })
  validationDate: Date;

  @Column({ name: 'status' })
  status: string;

  @ManyToOne(() => EmployeeEntity)
  @JoinColumn({ name: 'employee_id', referencedColumnName: 'employeeId' })
  employee?: EmployeeEntity;
}
