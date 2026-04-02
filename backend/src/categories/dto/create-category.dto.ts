import { IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  categoryName!: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  domain?: string;
}
