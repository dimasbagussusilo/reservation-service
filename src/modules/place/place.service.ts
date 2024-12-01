import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Place } from './entities/place.entity';
import { CreatePlaceDto, FindPlaceDto, UpdatePlaceDto } from './place.dto';
import { ExtractSort, FilterData } from '../../utilities/helper/global.helper';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
  ) {}

  async create(dto: CreatePlaceDto) {
    const createData = this.placeRepository.create(dto);
    return await this.placeRepository.save(createData);
  }

  async findAll(dto: FindPlaceDto) {
    const { sort_by = '-created_at', page, limit, ...rest } = dto;
    const { sortField, sortOrder } = ExtractSort(sort_by);
    const filter = FilterData(rest);

    let skip = 0;
    let take = 0;

    if (page && limit) {
      skip = (page - 1) * limit || 0;
      take = limit;
    }
    const [rows, total_row] = await this.placeRepository.findAndCount({
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

  async findOne(where: FindOptionsWhere<Place>) {
    return await this.placeRepository.findOne({ where });
  }

  async update(id: number, dto: UpdatePlaceDto) {
    const existingData = await this.findOne({ id });
    Object.assign(existingData, dto);
    await this.placeRepository.update({ id }, existingData);
    return existingData;
  }

  async remove(id: number) {
    const existingData = await this.findOne({ id });
    return await this.placeRepository.remove(existingData);
  }
}
