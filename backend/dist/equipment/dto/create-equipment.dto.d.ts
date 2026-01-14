import { EquipmentCategory } from '../../common/enums/equipment.enums';
export declare class CreateEquipmentDto {
    name: string;
    category: EquipmentCategory;
    manufacturerId: string;
    generation?: string;
    primaryRole?: string;
    primaryImage?: string;
    imageUrls?: string[];
    specs?: Record<string, any>;
    advantages?: string[];
    description?: string;
}
