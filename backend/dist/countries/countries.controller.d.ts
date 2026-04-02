import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { PaginationDto, PaginatedResult } from '../common/dto/pagination.dto';
import { Country } from './entities/country.entity';
export declare class CountriesController {
    private readonly countriesService;
    constructor(countriesService: CountriesService);
    create(createCountryDto: CreateCountryDto): Promise<Country>;
    findAll(paginationDto: PaginationDto): Promise<PaginatedResult<Country>>;
    findOne(id: string): Promise<Country>;
    update(id: string, updateCountryDto: UpdateCountryDto): Promise<Country>;
    remove(id: string): Promise<Country>;
}
