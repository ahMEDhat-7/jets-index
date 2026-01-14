import { CreateEquipmentVariantDto } from './dto/create-equipment-variant.dto';
import { UpdateEquipmentVariantDto } from './dto/update-equipment-variant.dto';
export declare class EquipmentVariantsService {
    create(createEquipmentVariantDto: CreateEquipmentVariantDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateEquipmentVariantDto: UpdateEquipmentVariantDto): string;
    remove(id: number): string;
}
