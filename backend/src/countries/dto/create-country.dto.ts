import { IsString, IsOptional, Length } from 'class-validator';

export class CreateCountryDto {
  @IsString()
  name: string;
}
