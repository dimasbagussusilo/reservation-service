import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Reservation, ReservationStatus } from './entities/reservation.entity';
import {
  CreateReservationDto,
  FindReservationDto,
  UpdateReservationDto,
} from './reservation.dto';
import { ExtractSort, FilterData } from '../../utilities/helper/global.helper';
import { ResourceService } from '../resource/resource.service';
import { PlaceService } from '../place/place.service';
import { EmailService } from '../email/email.service';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    private readonly resourceService: ResourceService,
    private readonly placeService: PlaceService,
    private readonly customerService: CustomerService,
    private readonly emailService: EmailService,
  ) {}

  async create(dto: CreateReservationDto) {
    const resource = await this.resourceService.findOne({
      id: dto.resource_id,
    });

    if (!resource.is_available) {
      throw new BadRequestException('this resource is not available');
    }

    const place = await this.placeService.findOne({
      id: resource.place_id,
    });

    const startTime = new Date(dto.start_time);
    const endTime = new Date(dto.end_time);
    const openTime = new Date(startTime.toDateString() + ' ' + place.open_time);
    const closeTime = new Date(endTime.toDateString() + ' ' + place.close_time);

    // Validate reservation time is within operating hours
    if (startTime < openTime || endTime >= closeTime) {
      throw new BadRequestException(
        'reservation time is outside operating hours.',
      );
    }

    const resourceReservedFilter = {
      start_time: { gte: dto.start_time },
      end_time: { lte: dto.end_time },
      status: { in: [ReservationStatus.Pending, ReservationStatus.Confirmed] },
    };

    const reservation = await this.findAll(resourceReservedFilter);
    if (reservation.rows.length) {
      throw new BadRequestException(
        `this resource is reserved until: ${new Date(dto.end_time).toLocaleString()}`,
      );
    }

    const customer = await this.customerService.findOne({
      id: dto.customer_id,
    });

    this.emailService
      .sendEmail(
        customer.email,
        'Reservation Created',
        `Your ${place.name} - ${resource.name} reservation has been created for ${startTime} to ${endTime}.`,
        `<p>Your reservation has been created for <strong>${startTime}</strong> to <strong>${endTime}</strong>.</p>`,
      )
      .then(() => console.log('Email sent successfully.'))
      .catch(() => console.log('Failed to send email'));

    dto.status = ReservationStatus.Pending;

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

    if (dto.status === ReservationStatus.Confirmed) {
      const customer = await this.customerService.findOne({
        id: existingData.customer_id,
      });

      const resource = await this.resourceService.findOne({
        id: existingData.resource_id,
      });

      const place = await this.placeService.findOne({
        id: resource.place_id,
      });

      const startTime = new Date(existingData.start_time);
      const endTime = new Date(existingData.end_time);

      this.emailService
        .sendEmail(
          customer.email,
          'Reservation Confirmed',
          `Your ${place.name} - ${resource.name} reservation has been confirmed for ${startTime} to ${endTime}.`,
          `<p>Your reservation has been created for <strong>${startTime}</strong> to <strong>${endTime}</strong>.</p>`,
        )
        .then(() => console.log('Email sent successfully.'))
        .catch(() => console.log('Failed to send email'));
    }

    return existingData;
  }

  async remove(id: number) {
    const existingData = await this.findOne({ id });
    return await this.reservationRepository.remove(existingData);
  }
}
