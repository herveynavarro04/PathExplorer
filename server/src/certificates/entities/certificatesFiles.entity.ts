import { Column, Entity, PrimaryColumn } from 'typeorm';
@Entity('certificate_file')
export class CertificatesFilesEntity {
  @PrimaryColumn({ name: 'certificate_id' })
  certificateId: string;

  @Column({ name: 'file_title' })
  fileTitle: string;

  @Column({ name: 'mimeType' })
  mimeType: string;

  @Column({ type: 'bytea', name: 'file_data' })
  fileData: Buffer;
}
