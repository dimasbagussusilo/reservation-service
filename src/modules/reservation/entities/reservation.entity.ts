import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customer } from 'src/modules/customer/entities/customer.entity';
import { Resource } from 'src/modules/resources/entities/resource.entity';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.id)
  @JoinColumn()
  customer_id: Customer;

  @ManyToOne(() => Resource, (resource) => resource.id)
  @JoinColumn()
  resource_id: Resource;

  @Column({ type: 'timestamp' })
  start_time: Date;

  @Column({ type: 'timestamp' })
  end_time: Date;

  @Column({
    type: 'enum',
    enum: ['Pending', 'Confirmed', 'Cancelled'],
  })
  status: 'Pending' | 'Confirmed' | 'Cancelled';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
