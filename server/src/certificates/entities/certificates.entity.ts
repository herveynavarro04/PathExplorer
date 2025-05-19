import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
@Entity('certificate')
export class CertificatesEntity {
  @PrimaryColumn({ name: 'certificate_id' })
  certificateId: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'employee_id' })
  employeeId: string;

  @Column({ name: 'certificate_data' })
  certificateData: Buffer;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'status' })
  status: string;
}
