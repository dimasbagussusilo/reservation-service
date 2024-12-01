import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ReservationStatus } from './entities/reservation.entity';

export class CreateReservationDto {
  @IsNumber()
  @IsNotEmpty()
  customer_id: number;

  @IsNumber()
  @IsNotEmpty()
  resource_id: number;

  @IsDateString()
  @IsNotEmpty()
  start_time: string;

  @IsDateString()
  @IsNotEmpty()
  end_time: string;

  @IsEnum(ReservationStatus)
  @IsOptional()
  status: ReservationStatus;
}

export class UpdateReservationDto extends PartialType(CreateReservationDto) {}

export class FindReservationDto {
  @IsOptional()
  sort_by?: string;

  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;

  [key: string]: any;
}
