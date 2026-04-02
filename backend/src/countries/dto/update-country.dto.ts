import { CreateCountryDto } from './create-country.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCountryDto extends PartialType(CreateCountryDto) {}
