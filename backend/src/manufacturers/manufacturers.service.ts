import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Manufacturer } from './entities/manufacturer.entity';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class ManufacturersService {
  constructor(
    @InjectRepository(Manufacturer)
    private readonly manufacturersRepository: Repository<Manufacturer>,
  ) {}

  create(createManufacturerDto: CreateManufacturerDto) {
    const manufacturer = this.manufacturersRepository.create(
      createManufacturerDto,
    );
    return this.manufacturersRepository.save(manufacturer);
  }

  findAll(query: PaginationQueryDto) {
    const { limit = 20, offset = 0, search } = query;
    const qb = this.manufacturersRepository.createQueryBuilder('manufacturer');

    if (search) {
      qb.where(
        'manufacturer.name ILIKE :search OR manufacturer.specialization ILIKE :search',
        { search: `%${search}%` },
      );
    }

    return qb
      .leftJoinAndSelect('manufacturer.headquartersCountry', 'country')
      .leftJoinAndSelect('manufacturer.platforms', 'platform')
      .take(limit)
      .skip(offset)
      .getMany();
  }

  async findOne(id: number) {
    const result = await this.manufacturersRepository.findOne({
      where: { id },
      relations: ['headquartersCountry', 'platforms'],
    });
    if (!result) {
      throw new NotFoundException(`Manufacturer #${id} not found`);
    }
    return result;
  }

  async update(id: number, updateManufacturerDto: UpdateManufacturerDto) {
    const manufacturer = await this.manufacturersRepository.preload({
      id,
      ...updateManufacturerDto,
    });
    if (!manufacturer) {
      throw new NotFoundException(`Manufacturer #${id} not found`);
    }
    return this.manufacturersRepository.save(manufacturer);
  }

  async remove(id: number) {
    const manufacturer = await this.findOne(id);
    return this.manufacturersRepository.remove(manufacturer);
  }
}
