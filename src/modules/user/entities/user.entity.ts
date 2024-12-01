import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

enum Role {
  Customer = 'Customer',
  Admin = 'Admin',
  Manager = 'Manager',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'email', type: 'varchar', unique: true })
  email: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @Column({
    name: 'role',
    type: 'enum',
    enum: Role,
  })
  role: Role;
}
