import { Module } from '@nestjs/common';
import { EquipmentVariantsService } from './equipment-variants.service';
import { EquipmentVariantsController } from './equipment-variants.controller';

@Module({
  controllers: [EquipmentVariantsController],
  providers: [EquipmentVariantsService],
})
export class EquipmentVariantsModule {}
