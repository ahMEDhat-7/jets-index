import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentVariantsService } from './equipment-variants.service';
import { EquipmentVariantsController } from './equipment-variants.controller';
import { EquipmentVariant } from './entities/equipment-variant.entity';
import { EquipmentModule } from '../equipment/equipment.module';

@Module({
  imports: [TypeOrmModule.forFeature([EquipmentVariant]), EquipmentModule],
  controllers: [EquipmentVariantsController],
  providers: [EquipmentVariantsService],
  exports: [EquipmentVariantsService],
})
export class EquipmentVariantsModule {}
