import { Manufacturer } from '../../manufacturers/entities/manufacturer.entity';
import { EquipmentVariant } from '../../equipment-variants/entities/equipment-variant.entity';
export declare enum EquipmentCategory {
    FIGHTER_JET = "fighter_jet",
    BOMBER = "bomber",
    DRONE = "drone",
    HELICOPTER = "helicopter"
}
export declare class Equipment {
    id: string;
    name: string;
    category: EquipmentCategory;
    generation?: string;
    primaryRole?: string;
    description?: string;
    specs?: Record<string, any>;
    advantages?: string[];
    manufacturer: Manufacturer;
    variants: EquipmentVariant[];
}
