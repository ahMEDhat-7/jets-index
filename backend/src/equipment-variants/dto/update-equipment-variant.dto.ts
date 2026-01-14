import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipmentVariantDto } from './create-equipment-variant.dto';

export class UpdateEquipmentVariantDto extends PartialType(CreateEquipmentVariantDto) {}
