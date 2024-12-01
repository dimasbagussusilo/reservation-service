import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ResourceType } from './entities/resource.entity';

export class CreateResourceDto {
  @IsNumber()
  @IsNotEmpty()
  place_id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  capacity: number;

  @IsEnum(ResourceType)
  type: ResourceType;

  @IsOptional()
  is_available?: boolean;
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
