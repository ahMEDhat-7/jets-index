import { IsString, IsOptional, IsUUID, IsArray, IsUrl } from 'class-validator';

export class CreateEquipmentVariantDto {
  @IsUUID()
  equipmentId: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  role?: string;
}
