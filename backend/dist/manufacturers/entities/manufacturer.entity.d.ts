import { Country } from '../../countries/entities/country.entity';
import { Equipment } from '../../equipment/entities/equipment.entity';
export declare class Manufacturer {
    id: string;
    name: string;
    country: Country;
    foundedYear?: number;
    description?: string;
    equipment: Equipment[];
}
