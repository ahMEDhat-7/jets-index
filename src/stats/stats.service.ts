import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from '../countries/entities/country.entity';
import { Manufacturer } from '../manufacturers/entities/manufacturer.entity';
import { Category } from '../categories/entities/category.entity';
import { Platform } from '../platforms/entities/platform.entity';
import { Blog } from '../blogs/entities/blog.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Country) private countryRepo: Repository<Country>,
    @InjectRepository(Manufacturer)
    private manufacturerRepo: Repository<Manufacturer>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Platform) private platformRepo: Repository<Platform>,
    @InjectRepository(Blog) private blogRepo: Repository<Blog>,
  ) {}

  async getStats() {
    const totalCountries = await this.countryRepo.count();
    const totalManufacturers = await this.manufacturerRepo.count();
    const totalCategories = await this.categoryRepo.count();
    const totalPlatforms = await this.platformRepo.count();
    const totalBlogs = await this.blogRepo.count();

    const platformsByCategory = await this.platformRepo
      .createQueryBuilder('platform')
      .select('platform.category', 'categoryName')
      .addSelect('COUNT(*)', 'count')
      .innerJoin('platform.category', 'category')
      .groupBy('platform.category')
      .getRawMany();

    const platformsByStatus = await this.platformRepo
      .createQueryBuilder('platform')
      .select('platform.operationalStatus', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('platform.operationalStatus')
      .getRawMany();

    const platformsByCountry = await this.platformRepo
      .createQueryBuilder('platform')
      .select('country.name', 'countryName')
      .addSelect('COUNT(*)', 'count')
      .innerJoin('platform.country', 'country')
      .groupBy('country.name')
      .orderBy('count', 'DESC')
      .limit(5)
      .getRawMany();

    return {
      totalCountries,
      totalManufacturers,
      totalCategories,
      totalPlatforms,
      totalBlogs,
      platformsByCategory,
      platformsByStatus,
      platformsByCountry,
    };
  }
}
