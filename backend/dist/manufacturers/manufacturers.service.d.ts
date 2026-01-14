import { Repository } from 'typeorm';
import { Manufacturer } from './entities/manufacturer.entity';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { CountriesService } from '../countries/countries.service';
export declare class ManufacturersService {
    private readonly manufacturerRepository;
    private readonly countriesService;
    constructor(manufacturerRepository: Repository<Manufacturer>, countriesService: CountriesService);
    create(createManufacturerDto: CreateManufacturerDto): Promise<Manufacturer>;
    findAll(): Promise<Manufacturer[]>;
    findOne(id: string): Promise<Manufacturer>;
    update(id: string, updateManufacturerDto: UpdateManufacturerDto): Promise<Manufacturer>;
    remove(id: string): Promise<Manufacturer>;
}
