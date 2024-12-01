import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsEnum, IsDateString,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ResourceType } from './entities/place.entity';

export class CreateResourceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  capacity: number;

  @IsEnum(ResourceType)
  type: ResourceType;

  @IsOptional()
  is_available?: boolean;

  @IsDateString()
  @IsNotEmpty()
  open_time: string;

  @IsDateString()
  @IsNotEmpty()
  close_time: string;
}

export class UpdateResourceDto extends PartialType(CreateResourceDto) {}

export class FindResourceDto {
  @IsOptional()
  sort_by?: string;

  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;

  [key: string]: any;
}
