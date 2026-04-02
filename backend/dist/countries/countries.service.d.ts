import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { PaginationDto, PaginatedResult } from '../common/dto/pagination.dto';
export declare class CountriesService {
    private readonly countryRepository;
    constructor(countryRepository: Repository<Country>);
    create(createCountryDto: CreateCountryDto): Promise<Country>;
    findAll(paginationDto: PaginationDto): Promise<PaginatedResult<Country>>;
    getTotalCount(): Promise<number>;
    findOne(id: string): Promise<Country>;
    update(id: string, updateCountryDto: UpdateCountryDto): Promise<Country>;
    remove(id: string): Promise<Country>;
}
