import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../utilities/guard/jwt.guard';
import { CustomerService } from './customer.service';
import {
  CreateCustomerDto,
  FindCustomerDto,
  UpdateCustomerDto,
} from './customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateCustomerDto) {
    return await this.customerService.create(dto);
  }

  @Get()
  async findAll(@Query() dto: FindCustomerDto) {
    return await this.customerService.findAll(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.customerService.findOne({ id });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: number, @Body() dto: UpdateCustomerDto) {
    return await this.customerService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number) {
    return await this.customerService.remove(id);
  }
}
