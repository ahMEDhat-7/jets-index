import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EquipmentVariant } from './entities/equipment-variant.entity';
import { CreateEquipmentVariantDto } from './dto/create-equipment-variant.dto';
import { UpdateEquipmentVariantDto } from './dto/update-equipment-variant.dto';
import { EquipmentService } from '../equipment/equipment.service';

@Injectable()
export class EquipmentVariantsService {
  constructor(
    @InjectRepository(EquipmentVariant)
    private readonly equipmentVariantRepository: Repository<EquipmentVariant>,
    private readonly equipmentService: EquipmentService,
  ) {}

  async create(createEquipmentVariantDto: CreateEquipmentVariantDto) {
    const equipment = await this.equipmentService.findOne(
      createEquipmentVariantDto.equipmentId,
    );
    const variant = this.equipmentVariantRepository.create({
      name: createEquipmentVariantDto.name,
      role: createEquipmentVariantDto.role,
      equipment,
    });
    return this.equipmentVariantRepository.save(variant);
  }

  async findAll() {
    return this.equipmentVariantRepository.find({
      relations: ['equipment'],
    });
  }

  async findOne(id: string) {
    const variant = await this.equipmentVariantRepository.findOne({
      where: { id },
      relations: ['equipment'],
    });
    if (!variant) {
      throw new NotFoundException(`Equipment Variant with ID ${id} not found`);
    }
    return variant;
  }

  async update(
    id: string,
    updateEquipmentVariantDto: UpdateEquipmentVariantDto,
  ) {
    const variant = await this.findOne(id);
    if (updateEquipmentVariantDto.equipmentId) {
      const equipment = await this.equipmentService.findOne(
        updateEquipmentVariantDto.equipmentId,
      );
      updateEquipmentVariantDto['equipment'] = equipment;
    }
    Object.assign(variant, updateEquipmentVariantDto);
    return this.equipmentVariantRepository.save(variant);
  }

  async remove(id: string) {
    const variant = await this.findOne(id);
    return this.equipmentVariantRepository.remove(variant);
  }
}
