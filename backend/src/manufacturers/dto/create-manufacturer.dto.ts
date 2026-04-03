import { IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';

export class CreateManufacturerDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name!: string;

  @IsOptional()
  @IsString()
  countryId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  specialization?: string;
}
