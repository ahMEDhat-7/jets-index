import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { EquipmentVariantsService } from './equipment-variants.service';
import { CreateEquipmentVariantDto } from './dto/create-equipment-variant.dto';
import { UpdateEquipmentVariantDto } from './dto/update-equipment-variant.dto';

@Controller('eq-var')
export class EquipmentVariantsController {
  constructor(
    private readonly equipmentVariantsService: EquipmentVariantsService,
  ) {}

  @Post()
  create(
    @Body()
    createEquipmentVariantDto: CreateEquipmentVariantDto,
  ) {
    return this.equipmentVariantsService.create(createEquipmentVariantDto);
  }

  @Get()
  findAll() {
    return this.equipmentVariantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.equipmentVariantsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    updateEquipmentVariantDto: UpdateEquipmentVariantDto,
  ) {
    return this.equipmentVariantsService.update(id, updateEquipmentVariantDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.equipmentVariantsService.remove(id);
  }
}
