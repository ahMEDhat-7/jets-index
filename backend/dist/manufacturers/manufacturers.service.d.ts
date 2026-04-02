import { Repository } from 'typeorm';
import { Manufacturer } from './entities/manufacturer.entity';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { CountriesService } from '../countries/countries.service';
import { PaginationDto, PaginatedResult } from '../common/dto/pagination.dto';
export declare class ManufacturersService {
    private readonly manufacturerRepository;
    private readonly countriesService;
    constructor(manufacturerRepository: Repository<Manufacturer>, countriesService: CountriesService);
    create(createManufacturerDto: CreateManufacturerDto): Promise<Manufacturer>;
    findAll(paginationDto: PaginationDto): Promise<PaginatedResult<Manufacturer>>;
    getTotalCount(): Promise<number>;
    findOne(id: string): Promise<Manufacturer>;
    update(id: string, updateManufacturerDto: UpdateManufacturerDto): Promise<Manufacturer>;
    remove(id: string): Promise<Manufacturer>;
}
