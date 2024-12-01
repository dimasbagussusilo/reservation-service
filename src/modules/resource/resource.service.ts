import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import {
  CreateReservationDto,
  FindReservationDto,
  UpdateReservationDto,
} from './reservation.dto';
import { ExtractSort, FilterData } from '../../utilities/helper/global.helper';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  async create(dto: CreateReservationDto) {
    const createData = this.reservationRepository.create(dto);
    return await this.reservationRepository.save(createData);
  }

  async findAll(dto: FindReservationDto) {
    const { sort_by = '-created_at', page, limit, ...rest } = dto;
    const { sortField, sortOrder } = ExtractSort(sort_by);
    const filter = FilterData(rest);

    let skip = 0;
    let take = 0;

    if (page && limit) {
      skip = (page - 1) * limit || 0;
      take = limit;
    }
    const [rows, total_row] = await this.reservationRepository.findAndCount({
      where: filter,
      order: { [sortField]: sortOrder },
      skip: skip,
      take: take,
    });

    return {
      rows,
      page,
      limit,
      total_row,
      total_page: Math.ceil(total_row / Number(limit)),
    };
  }

  async findOne(where: FindOptionsWhere<Reservation>) {
    return await this.reservationRepository.findOne({ where });
  }

  async update(id: number, dto: UpdateReservationDto) {
    const existingData = await this.findOne({ id });
    Object.assign(existingData, dto);
    await this.reservationRepository.update({ id }, existingData);
    return existingData;
  }

  async remove(id: number) {
    const existingData = await this.findOne({ id });
    return await this.reservationRepository.remove(existingData);
  }
}
