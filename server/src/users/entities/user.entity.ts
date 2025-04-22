import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('employee')
export class UserEntity {
  @PrimaryColumn()
  id_employee: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  img_url: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
