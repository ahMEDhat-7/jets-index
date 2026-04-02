import { Repository } from 'typeorm';
import { Equipment } from './entities/equipment.entity';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { ManufacturersService } from '../manufacturers/manufacturers.service';
import { PaginationDto, PaginatedResult } from '../common/dto/pagination.dto';
export declare class EquipmentService {
    private readonly equipmentRepository;
    private readonly manufacturersService;
    constructor(equipmentRepository: Repository<Equipment>, manufacturersService: ManufacturersService);
    create(createEquipmentDto: CreateEquipmentDto): Promise<Equipment>;
    findAll(paginationDto: PaginationDto): Promise<PaginatedResult<Equipment>>;
    findOne(id: string): Promise<Equipment>;
    update(id: string, updateEquipmentDto: UpdateEquipmentDto): Promise<Equipment>;
    remove(id: string): Promise<Equipment>;
    countByCategory(): Promise<{
        category: string;
        count: number;
    }[]>;
    countByCountry(): Promise<{
        country: string;
        count: number;
    }[]>;
    getTotalCount(): Promise<number>;
}
