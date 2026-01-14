import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
export declare class CountriesController {
    private readonly countriesService;
    constructor(countriesService: CountriesService);
    create(createCountryDto: CreateCountryDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCountryDto: UpdateCountryDto): string;
    remove(id: string): string;
}
