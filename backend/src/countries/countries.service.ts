import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  create(createCountryDto: CreateCountryDto) {
    const country = this.countryRepository.create(createCountryDto);
    return this.countryRepository.save(country);
  }

  findAll(query: PaginationQueryDto) {
    const { limit = 20, offset = 0, search } = query;
    const qb = this.countryRepository.createQueryBuilder('country');

    if (search) {
      qb.where('country.name ILIKE :search', { search: `%${search}%` });
    }

    return qb
      .leftJoinAndSelect('country.manufacturers', 'manufacturer')
      .leftJoinAndSelect('country.platforms', 'platform')
      .take(limit)
      .skip(offset)
      .getMany();
  }

  async findOne(id: number) {
    const found = await this.countryRepository.findOne({
      where: { id },
      relations: ['manufacturers', 'platforms'],
    });
    if (!found) {
      throw new NotFoundException(`Country #${id} not found`);
    }
    return found;
  }

  async update(id: number, updateCountryDto: UpdateCountryDto) {
    const country = await this.countryRepository.preload({
      id,
      ...updateCountryDto,
    });
    if (!country) {
      throw new NotFoundException(`Country #${id} not found`);
    }
    return this.countryRepository.save(country);
  }

  async remove(id: number) {
    const country = await this.findOne(id);
    return this.countryRepository.remove(country);
  }
}
