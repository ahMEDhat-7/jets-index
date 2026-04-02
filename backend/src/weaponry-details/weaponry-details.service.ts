import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WeaponryDetails } from './entities/weaponry-details.entity';
import { CreateWeaponryDetailsDto } from './dto/create-weaponry-details.dto';
import { UpdateWeaponryDetailsDto } from './dto/update-weaponry-details.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class WeaponryDetailsService {
  constructor(
    @InjectRepository(WeaponryDetails)
    private readonly weaponryDetailsRepository: Repository<WeaponryDetails>,
  ) {}

  create(createWeaponryDetailsDto: CreateWeaponryDetailsDto) {
    const weaponryDetails = this.weaponryDetailsRepository.create({
      platformId: createWeaponryDetailsDto.platformId,
      guidanceSystem: createWeaponryDetailsDto.guidanceSystem,
      warheadType: createWeaponryDetailsDto.warheadType,
      effectiveRangeKm: createWeaponryDetailsDto.effectiveRangeKm,
    });
    return this.weaponryDetailsRepository.save(weaponryDetails);
  }

  findAll(query: PaginationQueryDto) {
    const { limit = 20, offset = 0 } = query;
    return this.weaponryDetailsRepository.find({
      relations: ['platform'],
      take: limit,
      skip: offset,
    });
  }

  async findOne(platformId: number) {
    const result = await this.weaponryDetailsRepository.findOne({
      where: { platformId },
      relations: ['platform'],
    });
    if (!result) {
      throw new NotFoundException(
        `WeaponryDetails for platform #${platformId} not found`,
      );
    }
    return result;
  }

  async update(
    platformId: number,
    updateWeaponryDetailsDto: UpdateWeaponryDetailsDto,
  ) {
    const weaponryDetails = await this.weaponryDetailsRepository.preload({
      platformId,
      ...updateWeaponryDetailsDto,
    });
    if (!weaponryDetails) {
      throw new NotFoundException(
        `WeaponryDetails for platform #${platformId} not found`,
      );
    }
    return this.weaponryDetailsRepository.save(weaponryDetails);
  }

  async remove(platformId: number) {
    const weaponryDetails = await this.findOne(platformId);
    return this.weaponryDetailsRepository.remove(weaponryDetails);
  }
}
