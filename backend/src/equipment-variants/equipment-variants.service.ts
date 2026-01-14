import { Injectable } from '@nestjs/common';
import { CreateEquipmentVariantDto } from './dto/create-equipment-variant.dto';
import { UpdateEquipmentVariantDto } from './dto/update-equipment-variant.dto';

@Injectable()
export class EquipmentVariantsService {
  create(createEquipmentVariantDto: CreateEquipmentVariantDto) {
    return 'This action adds a new equipmentVariant';
  }

  findAll() {
    return `This action returns all equipmentVariants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipmentVariant`;
  }

  update(id: number, updateEquipmentVariantDto: UpdateEquipmentVariantDto) {
    return `This action updates a #${id} equipmentVariant`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipmentVariant`;
  }
}
