import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
export declare class EquipmentController {
    private readonly equipmentService;
    constructor(equipmentService: EquipmentService);
    create(createEquipmentDto: CreateEquipmentDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateEquipmentDto: UpdateEquipmentDto): string;
    remove(id: string): string;
}
