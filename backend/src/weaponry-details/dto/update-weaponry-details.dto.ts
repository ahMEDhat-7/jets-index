import { PartialType } from '@nestjs/mapped-types';
import { CreateWeaponryDetailsDto } from './create-weaponry-details.dto';

export class UpdateWeaponryDetailsDto extends PartialType(CreateWeaponryDetailsDto) {}
