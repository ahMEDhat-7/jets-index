import {
  IsString,
  IsOptional,
  IsEnum,
  IsUUID,
  IsObject,
  IsArray,
  IsUrl,
} from 'class-validator';
import { EquipmentCategory } from '../../common/enums/equipment.enums';

export class CreateEquipmentDto {
  @IsString()
  name: string;

  @IsEnum(EquipmentCategory)
  category: EquipmentCategory;

  @IsUUID()
  manufacturerId: string;

  @IsOptional()
  @IsString()
  generation?: string;

  @IsOptional()
  @IsString()
  primaryRole?: string;

  @IsOptional()
  @IsUrl()
  primaryImage?: string;

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  imageUrls?: string[];

  @IsOptional()
  @IsObject()
  specs?: Record<string, any>;

  @IsOptional()
  @IsArray()
  advantages?: string[];

  @IsOptional()
  @IsString()
  description?: string;
}
