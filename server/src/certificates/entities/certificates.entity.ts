import { Column, Entity, PrimaryColumn } from 'typeorm';
@Entity('certificate')
export class CertificatesEntity {
  @PrimaryColumn({ name: 'certificate_id' })
  certificateId: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'employee_id' })
  employeeId: string;

  @Column({ name: 'information' })
  information: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'obtianed_at' })
  obtainedAt: Date;

  @Column({ name: 'status' })
  status: string;
}
