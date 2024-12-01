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
import { PlaceService } from './place.service';
import { CreatePlaceDto, FindPlaceDto, UpdatePlaceDto } from './place.dto';

@Controller('places')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreatePlaceDto) {
    return await this.placeService.create(dto);
  }

  @Get()
  async findAll(@Query() dto: FindPlaceDto) {
    return await this.placeService.findAll(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.placeService.findOne({ id });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: number, @Body() dto: UpdatePlaceDto) {
    return await this.placeService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number) {
    return await this.placeService.remove(id);
  }
}
