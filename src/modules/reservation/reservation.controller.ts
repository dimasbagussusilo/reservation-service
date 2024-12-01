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
import { ReservationService } from './reservation.service';
import {
  CreateReservationDto,
  FindReservationDto,
  UpdateReservationDto,
} from './reservation.dto';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateReservationDto) {
    return await this.reservationService.create(dto);
  }

  @Get()
  async findAll(@Query() dto: FindReservationDto) {
    return await this.reservationService.findAll(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.reservationService.findOne({ id });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: number, @Body() dto: UpdateReservationDto) {
    return await this.reservationService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number) {
    return await this.reservationService.remove(id);
  }
}
