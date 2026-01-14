import { IsString, IsOptional, IsUUID, IsInt } from 'class-validator';

export class CreateManufacturerDto {
  @IsString()
  name: string;

  @IsUUID()
  countryId: string;

  @IsOptional()
  @IsInt()
  foundedYear?: number;

  @IsOptional()
  @IsString()
  description?: string;
}
