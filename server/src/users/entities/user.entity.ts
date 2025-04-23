import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryColumn({ name: 'userid' })
  userId: string;

  @Column({ name: 'email' })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'imgurl' })
  imgUrl: string;

  @Column({ name: 'firstname' })
  firstName: string;

  @Column({ name: 'lastname' })
  lastName: string;
}
