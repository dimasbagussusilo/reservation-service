import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import {
  CreateCustomerDto,
  FindCustomerDto,
  UpdateCustomerDto,
} from './customer.dto';
import { ExtractSort, FilterData } from '../../utilities/helper/global.helper';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async create(dto: CreateCustomerDto) {
    const createData = this.customerRepository.create(dto);
    return await this.customerRepository.save(createData);
  }

  async findAll(dto: FindCustomerDto) {
    const { sort_by = '-created_at', page, limit, ...rest } = dto;
    const { sortField, sortOrder } = ExtractSort(sort_by);
    const filter = FilterData(rest);

    let skip = 0;
    let take = 0;

    if (page && limit) {
      skip = (page - 1) * limit || 0;
      take = limit;
    }
    const [rows, total_row] = await this.customerRepository.findAndCount({
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

  async findOne(where: FindOptionsWhere<Customer>) {
    return await this.customerRepository.findOne({ where });
  }

  async update(id: number, dto: UpdateCustomerDto) {
    const existingData = await this.findOne({ id });
    Object.assign(existingData, dto);
    await this.customerRepository.update({ id }, existingData);
    return existingData;
  }

  async remove(id: number) {
    const existingData = await this.findOne({ id });
    return await this.customerRepository.remove(existingData);
  }
}
