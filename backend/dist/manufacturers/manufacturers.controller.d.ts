import { ManufacturersService } from './manufacturers.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { PaginationDto, PaginatedResult } from '../common/dto/pagination.dto';
import { Manufacturer } from './entities/manufacturer.entity';
export declare class ManufacturersController {
    private readonly manufacturersService;
    constructor(manufacturersService: ManufacturersService);
    create(createManufacturerDto: CreateManufacturerDto): Promise<Manufacturer>;
    findAll(paginationDto: PaginationDto): Promise<PaginatedResult<Manufacturer>>;
    findOne(id: string): Promise<Manufacturer>;
    update(id: string, updateManufacturerDto: UpdateManufacturerDto): Promise<Manufacturer>;
    remove(id: string): Promise<Manufacturer>;
}
