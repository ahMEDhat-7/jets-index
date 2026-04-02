import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { WeaponryDetailsService } from './weaponry-details.service';
import { CreateWeaponryDetailsDto } from './dto/create-weaponry-details.dto';
import { UpdateWeaponryDetailsDto } from './dto/update-weaponry-details.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Controller('weaponry-details')
export class WeaponryDetailsController {
  constructor(
    private readonly weaponryDetailsService: WeaponryDetailsService,
  ) {}

  @Post()
  create(@Body() createWeaponryDetailsDto: CreateWeaponryDetailsDto) {
    return this.weaponryDetailsService.create(createWeaponryDetailsDto);
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.weaponryDetailsService.findAll(paginationQuery);
  }

  @Get(':platformId')
  findOne(@Param('platformId') platformId: string) {
    return this.weaponryDetailsService.findOne(+platformId);
  }

  @Patch(':platformId')
  update(
    @Param('platformId') platformId: string,
    @Body() updateWeaponryDetailsDto: UpdateWeaponryDetailsDto,
  ) {
    return this.weaponryDetailsService.update(
      +platformId,
      updateWeaponryDetailsDto,
    );
  }

  @Delete(':platformId')
  remove(@Param('platformId') platformId: string) {
    return this.weaponryDetailsService.remove(+platformId);
  }
}
