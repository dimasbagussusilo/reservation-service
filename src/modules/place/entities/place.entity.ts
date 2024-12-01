import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum PlaceType {
  Restaurant = 'Restaurant',
  Hotel = 'Hotel',
  Sport_Area = 'Sport_Area',
}

@Entity('places')
export class Place {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: PlaceType })
  type: PlaceType;

  @Column()
  description: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column({ type: 'time' })
  open_time: Date;

  @Column({ type: 'time' })
  close_time: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
