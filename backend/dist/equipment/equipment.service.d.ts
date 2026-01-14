import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
export declare class EquipmentService {
    create(createEquipmentDto: CreateEquipmentDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateEquipmentDto: UpdateEquipmentDto): string;
    remove(id: number): string;
}
