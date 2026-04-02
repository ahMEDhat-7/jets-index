import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeaponryDetails } from './entities/weaponry-details.entity';
import { WeaponryDetailsService } from './weaponry-details.service';
import { WeaponryDetailsController } from './weaponry-details.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WeaponryDetails])],
  controllers: [WeaponryDetailsController],
  providers: [WeaponryDetailsService],
})
export class WeaponryDetailsModule {}
