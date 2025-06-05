import { EmployeeEntity } from 'src/employee/entities/employee.entity';
import { PeopleLeadEntity } from 'src/people-lead/entity/peopleLead.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('employee_assigned')
export class EmployeeAssigned {
  @PrimaryColumn({ name: 'employee_id' })
  employeeId: string;

  @Column({ name: 'people_lead_id' })
  peopleLeadId: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => EmployeeEntity, (employee) => employee.employeeAssigned, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'employee_id' })
  employee?: EmployeeEntity;

  @ManyToOne(() => PeopleLeadEntity, (employee) => employee.employeeAssigned, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'people_lead_id' })
  peopleLead?: PeopleLeadEntity;
}
