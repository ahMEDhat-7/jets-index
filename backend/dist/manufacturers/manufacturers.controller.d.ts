import { ManufacturersService } from './manufacturers.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
export declare class ManufacturersController {
    private readonly manufacturersService;
    constructor(manufacturersService: ManufacturersService);
    create(createManufacturerDto: CreateManufacturerDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateManufacturerDto: UpdateManufacturerDto): string;
    remove(id: string): string;
}
