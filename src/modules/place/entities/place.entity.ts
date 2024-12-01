import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ResourceType {
  Table = 'Table',
  Room = 'Room',
  Hall = 'Hall',
}

@Entity('resources')
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ResourceType })
  type: ResourceType;

  @Column({ nullable: true })
  capacity: number;

  @Column({ type: 'boolean', default: true })
  is_available: boolean;

  @Column({ type: 'timestamp' })
  open_time: Date;

  @Column({ type: 'timestamp' })
  close_time: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
