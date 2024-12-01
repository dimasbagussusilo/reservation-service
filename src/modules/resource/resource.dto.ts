import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateResourceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  capacity: number;
}

export class UpdateResourceDto extends PartialType(CreateResourceDto) {}
