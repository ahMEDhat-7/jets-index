import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipmentVariantsService } from './equipment-variants.service';
import { CreateEquipmentVariantDto } from './dto/create-equipment-variant.dto';
import { UpdateEquipmentVariantDto } from './dto/update-equipment-variant.dto';

@Controller('equipment-variants')
export class EquipmentVariantsController {
  constructor(private readonly equipmentVariantsService: EquipmentVariantsService) {}

  @Post()
  create(@Body() createEquipmentVariantDto: CreateEquipmentVariantDto) {
    return this.equipmentVariantsService.create(createEquipmentVariantDto);
  }

  @Get()
  findAll() {
    return this.equipmentVariantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipmentVariantsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipmentVariantDto: UpdateEquipmentVariantDto) {
    return this.equipmentVariantsService.update(+id, updateEquipmentVariantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipmentVariantsService.remove(+id);
  }
}
