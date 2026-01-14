import { Repository } from 'typeorm';
import { Equipment } from './entities/equipment.entity';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { ManufacturersService } from '../manufacturers/manufacturers.service';
export declare class EquipmentService {
    private readonly equipmentRepository;
    private readonly manufacturersService;
    constructor(equipmentRepository: Repository<Equipment>, manufacturersService: ManufacturersService);
    create(createEquipmentDto: CreateEquipmentDto): Promise<Equipment>;
    findAll(): Promise<Equipment[]>;
    findOne(id: string): Promise<Equipment>;
    update(id: string, updateEquipmentDto: UpdateEquipmentDto): Promise<Equipment>;
    remove(id: string): Promise<Equipment>;
}
