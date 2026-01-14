import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipment } from './entities/equipment.entity';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { ManufacturersService } from '../manufacturers/manufacturers.service';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
    private readonly manufacturersService: ManufacturersService,
  ) {}

  async create(createEquipmentDto: CreateEquipmentDto) {
    const manufacturer = await this.manufacturersService.findOne(
      createEquipmentDto.manufacturerId,
    );
    const equipment = this.equipmentRepository.create({
      ...createEquipmentDto,
      manufacturer,
    });
    return this.equipmentRepository.save(equipment);
  }

  async findAll() {
    return this.equipmentRepository.find({
      relations: ['manufacturer', 'variants'],
    });
  }

  async findOne(id: string) {
    const equipment = await this.equipmentRepository.findOne({
      where: { id },
      relations: ['manufacturer', 'variants'],
    });
    if (!equipment) {
      throw new NotFoundException(`Equipment with ID ${id} not found`);
    }
    return equipment;
  }

  async update(id: string, updateEquipmentDto: UpdateEquipmentDto) {
    const equipment = await this.findOne(id);
    if (updateEquipmentDto.manufacturerId) {
      const manufacturer = await this.manufacturersService.findOne(
        updateEquipmentDto.manufacturerId,
      );
      updateEquipmentDto['manufacturer'] = manufacturer;
    }
    Object.assign(equipment, updateEquipmentDto);
    return this.equipmentRepository.save(equipment);
  }

  async remove(id: string) {
    const equipment = await this.findOne(id);
    return this.equipmentRepository.remove(equipment);
  }
}
