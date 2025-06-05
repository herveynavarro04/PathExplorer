import { IsOptional } from 'class-validator';
import { EmployeeAssigned } from 'src/common/entities/employeeAssigned.entity';
import { EmployeeEntity } from 'src/employee/entities/employee.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity('people_lead')
export class PeopleLeadEntity {
  @PrimaryColumn({ name: 'employee_id' })
  employeeId: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'validation_date' })
  validationDate: Date;

  @Column({ name: 'status' })
  status: string;

  @ManyToOne(() => EmployeeEntity)
  @JoinColumn({ name: 'employee_id', referencedColumnName: 'employeeId' })
  employee?: EmployeeEntity;

  @OneToMany(() => EmployeeAssigned, (link) => link.employee, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @IsOptional()
  employeeAssigned?: EmployeeAssigned[];
}
