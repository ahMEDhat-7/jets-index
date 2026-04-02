import { Repository } from 'typeorm';
import { EquipmentVariant } from './entities/equipment-variant.entity';
import { CreateEquipmentVariantDto } from './dto/create-equipment-variant.dto';
import { UpdateEquipmentVariantDto } from './dto/update-equipment-variant.dto';
import { EquipmentService } from '../equipment/equipment.service';
import { PaginationDto, PaginatedResult } from '../common/dto/pagination.dto';
export declare class EquipmentVariantsService {
    private readonly equipmentVariantRepository;
    private readonly equipmentService;
    constructor(equipmentVariantRepository: Repository<EquipmentVariant>, equipmentService: EquipmentService);
    create(createEquipmentVariantDto: CreateEquipmentVariantDto): Promise<EquipmentVariant>;
    findAll(paginationDto: PaginationDto): Promise<PaginatedResult<EquipmentVariant>>;
    findOne(id: string): Promise<EquipmentVariant>;
    update(id: string, updateEquipmentVariantDto: UpdateEquipmentVariantDto): Promise<EquipmentVariant>;
    remove(id: string): Promise<EquipmentVariant>;
}
