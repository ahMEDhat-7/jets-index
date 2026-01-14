import { EquipmentVariantsService } from './equipment-variants.service';
import { CreateEquipmentVariantDto } from './dto/create-equipment-variant.dto';
import { UpdateEquipmentVariantDto } from './dto/update-equipment-variant.dto';
export declare class EquipmentVariantsController {
    private readonly equipmentVariantsService;
    constructor(equipmentVariantsService: EquipmentVariantsService);
    create(createEquipmentVariantDto: CreateEquipmentVariantDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateEquipmentVariantDto: UpdateEquipmentVariantDto): string;
    remove(id: string): string;
}
