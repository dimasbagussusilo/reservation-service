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
import { ResourceService } from './resource.service';
import {
  CreateResourceDto,
  FindResourceDto,
  UpdateResourceDto,
} from './resource.dto';

@Controller('resources')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateResourceDto) {
    return await this.resourceService.create(dto);
  }

  @Get()
  async findAll(@Query() dto: FindResourceDto) {
    return await this.resourceService.findAll(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.resourceService.findOne({ id });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: number, @Body() dto: UpdateResourceDto) {
    return await this.resourceService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number) {
    return await this.resourceService.remove(id);
  }
}
