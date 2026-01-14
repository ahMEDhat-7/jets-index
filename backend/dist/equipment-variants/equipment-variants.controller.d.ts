import { EquipmentVariantsService } from './equipment-variants.service';
import { CreateEquipmentVariantDto } from './dto/create-equipment-variant.dto';
import { UpdateEquipmentVariantDto } from './dto/update-equipment-variant.dto';
export declare class EquipmentVariantsController {
    private readonly equipmentVariantsService;
    constructor(equipmentVariantsService: EquipmentVariantsService);
    create(createEquipmentVariantDto: CreateEquipmentVariantDto): Promise<import("./entities/equipment-variant.entity").EquipmentVariant>;
    findAll(): Promise<import("./entities/equipment-variant.entity").EquipmentVariant[]>;
    findOne(id: string): Promise<import("./entities/equipment-variant.entity").EquipmentVariant>;
    update(id: string, updateEquipmentVariantDto: UpdateEquipmentVariantDto): Promise<import("./entities/equipment-variant.entity").EquipmentVariant>;
    remove(id: string): Promise<import("./entities/equipment-variant.entity").EquipmentVariant>;
}
