import { IsNotEmpty, IsString, MaxLength, IsOptional, IsInt, Min } from 'class-validator';

export class CreateManufacturerDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name!: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  headquartersCountryId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  specialization?: string;
}
