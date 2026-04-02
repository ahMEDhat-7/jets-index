import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { PaginationDto, PaginatedResult } from '../common/dto/pagination.dto';
import { Equipment } from './entities/equipment.entity';
export declare class EquipmentController {
    private readonly equipmentService;
    constructor(equipmentService: EquipmentService);
    create(createEquipmentDto: CreateEquipmentDto): Promise<Equipment>;
    findAll(paginationDto: PaginationDto): Promise<PaginatedResult<Equipment>>;
    findOne(id: string): Promise<Equipment>;
    update(id: string, updateEquipmentDto: UpdateEquipmentDto): Promise<Equipment>;
    remove(id: string): Promise<Equipment>;
}
