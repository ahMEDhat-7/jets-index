import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
export declare class EquipmentController {
    private readonly equipmentService;
    constructor(equipmentService: EquipmentService);
    create(createEquipmentDto: CreateEquipmentDto): Promise<import("./entities/equipment.entity").Equipment>;
    findAll(): Promise<import("./entities/equipment.entity").Equipment[]>;
    findOne(id: string): Promise<import("./entities/equipment.entity").Equipment>;
    update(id: string, updateEquipmentDto: UpdateEquipmentDto): Promise<import("./entities/equipment.entity").Equipment>;
    remove(id: string): Promise<import("./entities/equipment.entity").Equipment>;
}
