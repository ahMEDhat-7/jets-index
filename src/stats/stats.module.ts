import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { Country } from '../countries/entities/country.entity';
import { Manufacturer } from '../manufacturers/entities/manufacturer.entity';
import { Category } from '../categories/entities/category.entity';
import { Platform } from '../platforms/entities/platform.entity';
import { Blog } from '../blogs/entities/blog.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Country, Manufacturer, Category, Platform, Blog]),
  ],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
