import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsOptional,
  IsDateString,
  IsEmail,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber('ID')
  @IsNotEmpty()
  phone: string;

  @IsString()
  address: string;

  @IsDateString()
  date_of_birth: Date;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}

export class FindCustomerDto {
  @IsOptional()
  sort_by?: string;

  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;

  [key: string]: any;
}
