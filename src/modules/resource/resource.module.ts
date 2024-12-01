import { Module } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceController } from './resource.controller';
import { Resource } from './entities/resource.entity';
import { PlaceModule } from '../place/place.module';

@Module({
  imports: [TypeOrmModule.forFeature([Resource]), PlaceModule],
  controllers: [ResourceController],
  providers: [ResourceService],
  exports: [ResourceService],
})
export class ResourceModule {}
