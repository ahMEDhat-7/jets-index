import {
  IsNotEmpty,
  IsInt,
  Min,
  IsOptional,
  IsString,
  MaxLength,
  IsNumber,
} from 'class-validator';

export class CreateWeaponryDetailsDto {
  @IsInt()
  @Min(1)
  platformId!: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  guidanceSystem?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  warheadType?: string;

  @IsOptional()
  @IsString()
  effectiveRangeKm?: string;
}
