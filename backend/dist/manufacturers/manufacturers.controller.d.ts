import { ManufacturersService } from './manufacturers.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
export declare class ManufacturersController {
    private readonly manufacturersService;
    constructor(manufacturersService: ManufacturersService);
    create(createManufacturerDto: CreateManufacturerDto): Promise<import("./entities/manufacturer.entity").Manufacturer>;
    findAll(): Promise<import("./entities/manufacturer.entity").Manufacturer[]>;
    findOne(id: string): Promise<import("./entities/manufacturer.entity").Manufacturer>;
    update(id: string, updateManufacturerDto: UpdateManufacturerDto): Promise<import("./entities/manufacturer.entity").Manufacturer>;
    remove(id: string): Promise<import("./entities/manufacturer.entity").Manufacturer>;
}
