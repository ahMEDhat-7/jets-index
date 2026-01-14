import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manufacturer } from './entities/manufacturer.entity';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { CountriesService } from '../countries/countries.service';

@Injectable()
export class ManufacturersService {
  constructor(
    @InjectRepository(Manufacturer)
    private readonly manufacturerRepository: Repository<Manufacturer>,
    private readonly countriesService: CountriesService,
  ) {}

  async create(createManufacturerDto: CreateManufacturerDto) {
    const country = await this.countriesService.findOne(
      createManufacturerDto.countryId,
    );
    const manufacturer = this.manufacturerRepository.create({
      ...createManufacturerDto,
      country,
    });
    return this.manufacturerRepository.save(manufacturer);
  }

  async findAll() {
    return this.manufacturerRepository.find({
      relations: ['country', 'equipment'],
    });
  }

  async findOne(id: string) {
    const manufacturer = await this.manufacturerRepository.findOne({
      where: { id },
      relations: ['country', 'equipment'],
    });
    if (!manufacturer) {
      throw new NotFoundException(`Manufacturer with ID ${id} not found`);
    }
    return manufacturer;
  }

  async update(id: string, updateManufacturerDto: UpdateManufacturerDto) {
    const manufacturer = await this.findOne(id);
    if (updateManufacturerDto.countryId) {
      const country = await this.countriesService.findOne(
        updateManufacturerDto.countryId,
      );
      updateManufacturerDto['country'] = country;
    }
    Object.assign(manufacturer, updateManufacturerDto);
    return this.manufacturerRepository.save(manufacturer);
  }

  async remove(id: string) {
    const manufacturer = await this.findOne(id);
    return this.manufacturerRepository.remove(manufacturer);
  }
}
