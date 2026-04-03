import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreatePlatformDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  unitCostUsd?: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  operationalStatus?: string;

  @IsOptional()
  technicalSpecs?: object;

  @IsOptional()
  @IsString()
  @MaxLength(512)
  imageUrl?: string;

  @IsString()
  categoryId!: string;

  @IsString()
  manuId!: string;

  @IsString()
  countryId!: string;
}
  technicalSpecs?: object;
}
