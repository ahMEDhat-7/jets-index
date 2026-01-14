import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
export declare class ManufacturersService {
    create(createManufacturerDto: CreateManufacturerDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateManufacturerDto: UpdateManufacturerDto): string;
    remove(id: number): string;
}
