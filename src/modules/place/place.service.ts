import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Resource } from './entities/place.entity';
import {
  CreateResourceDto,
  FindResourceDto,
  UpdateResourceDto,
} from './resource.dto';
import { ExtractSort, FilterData } from '../../utilities/helper/global.helper';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
  ) {}

  async create(dto: CreateResourceDto) {
    const createData = this.resourceRepository.create(dto);
    return await this.resourceRepository.save(createData);
  }

  async findAll(dto: FindResourceDto) {
    const { sort_by = '-created_at', page, limit, ...rest } = dto;
    const { sortField, sortOrder } = ExtractSort(sort_by);
    const filter = FilterData(rest);

    let skip = 0;
    let take = 0;

    if (page && limit) {
      skip = (page - 1) * limit || 0;
      take = limit;
    }
    const [rows, total_row] = await this.resourceRepository.findAndCount({
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

  async findOne(where: FindOptionsWhere<Resource>) {
    return await this.resourceRepository.findOne({ where });
  }

  async update(id: number, dto: UpdateResourceDto) {
    const existingData = await this.findOne({ id });
    Object.assign(existingData, dto);
    await this.resourceRepository.update({ id }, existingData);
    return existingData;
  }

  async remove(id: number) {
    const existingData = await this.findOne({ id });
    return await this.resourceRepository.remove(existingData);
  }
}
