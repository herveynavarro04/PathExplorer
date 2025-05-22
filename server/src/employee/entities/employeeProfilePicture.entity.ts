import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { EmployeeEntity } from './employee.entity';

@Entity('employee_profile_picture')
export class EmployeeProfilePicture {
  @PrimaryColumn({ name: 'employee_id' })
  employeeId: string;

  @Column({ type: 'bytea', name: 'image_data' })
  imageData: Buffer;

  @Column({ name: 'mime_type' })
  mimeType: string;

  @Column({ name: 'uploaded_at' })
  uploadedAt: Date;

  @OneToOne(() => EmployeeEntity)
  @JoinColumn({ name: 'employee_id' })
  employee: EmployeeEntity;
}
