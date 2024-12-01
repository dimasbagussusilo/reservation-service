import { IsString, IsDateString, IsInt, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateReservationDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  customerId: number;

  @IsInt()
  @IsNotEmpty()
  resourceId: number;

  @IsDateString()
  @IsNotEmpty()
  reservation_date: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}

export class UpdateReservationDto extends PartialType(CreateReservationDto) {}
