import { EquipmentVariantsService } from './equipment-variants.service';
import { CreateEquipmentVariantDto } from './dto/create-equipment-variant.dto';
import { UpdateEquipmentVariantDto } from './dto/update-equipment-variant.dto';
import { PaginationDto, PaginatedResult } from '../common/dto/pagination.dto';
import { EquipmentVariant } from './entities/equipment-variant.entity';
export declare class EquipmentVariantsController {
    private readonly equipmentVariantsService;
    constructor(equipmentVariantsService: EquipmentVariantsService);
    create(createEquipmentVariantDto: CreateEquipmentVariantDto): Promise<EquipmentVariant>;
    findAll(paginationDto: PaginationDto): Promise<PaginatedResult<EquipmentVariant>>;
    findOne(id: string): Promise<EquipmentVariant>;
    update(id: string, updateEquipmentVariantDto: UpdateEquipmentVariantDto): Promise<EquipmentVariant>;
    remove(id: string): Promise<EquipmentVariant>;
}
