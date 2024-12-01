import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationController } from './reservation.controller';
import { Reservation } from './entities/reservation.entity';
import { ResourceModule } from '../resource/resource.module';
import { PlaceModule } from '../place/place.module';
import { EmailModule } from '../email/email.module';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
    PlaceModule,
    ResourceModule,
    CustomerModule,
    EmailModule,
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [ReservationService],
})
export class ReservationModule {}
