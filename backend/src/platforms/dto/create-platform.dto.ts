import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
  IsInt,
  Min,
  IsNumber,
} from 'class-validator';

export class CreatePlatformDto {
  @IsOptional()
  @IsString()
  @MaxLength(20)
  idCode?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @IsOptional()
  @IsString()
  typeDescription?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  categoryId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  manufacturerId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  originCountryId?: number;

  @IsOptional()
  @IsString()
  unitCostUsd?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  operationalStatus?: string;

  @IsOptional()
  technicalSpecs?: object;
}
