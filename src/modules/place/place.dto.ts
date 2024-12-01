import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsLatitude,
  IsLongitude,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { PlaceType } from './entities/place.entity';

export class CreatePlaceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsLatitude()
  latitude: string;

  @IsLongitude()
  longitude: string;

  @IsEnum(PlaceType)
  type: PlaceType;

  @IsString()
  @IsNotEmpty()
  open_time: string;

  @IsString()
  @IsNotEmpty()
  close_time: string;
}

export class UpdatePlaceDto extends PartialType(CreatePlaceDto) {}

export class FindPlaceDto {
  @IsOptional()
  sort_by?: string;

  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;

  [key: string]: any;
}
