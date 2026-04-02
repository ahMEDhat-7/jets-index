import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Platform } from './entities/platform.entity';
import { CreatePlatformDto } from './dto/create-platform.dto';
import { UpdatePlatformDto } from './dto/update-platform.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class PlatformsService {
  constructor(
    @InjectRepository(Platform)
    private readonly platformsRepository: Repository<Platform>,
  ) {}

  private mapDtoToPlatform(
    dto: CreatePlatformDto | UpdatePlatformDto,
  ): Partial<Platform> {
    const mapped: Partial<Platform> = {
      idCode: dto.idCode,
      name: dto.name,
      typeDescription: dto.typeDescription,
      unitCostUsd: dto.unitCostUsd,
      operationalStatus: dto.operationalStatus,
      technicalSpecs: dto.technicalSpecs as object,
    };

    if ('categoryId' in dto && dto.categoryId) {
      mapped.category = { id: dto.categoryId } as any;
    }
    if ('manufacturerId' in dto && dto.manufacturerId) {
      mapped.manufacturer = { id: dto.manufacturerId } as any;
    }
    if ('originCountryId' in dto && dto.originCountryId) {
      mapped.originCountry = { id: dto.originCountryId } as any;
    }

    return mapped;
  }

  create(createPlatformDto: CreatePlatformDto) {
    const platform = this.platformsRepository.create(
      this.mapDtoToPlatform(createPlatformDto),
    );
    return this.platformsRepository.save(platform);
  }

  findAll(query: PaginationQueryDto) {
    const { limit = 20, offset = 0, search } = query;
    const qb = this.platformsRepository.createQueryBuilder('platform');

    if (search) {
      qb.where(
        'platform.name ILIKE :search OR platform.operationalStatus ILIKE :search',
        { search: `%${search}%` },
      );
    }

    return qb
      .leftJoinAndSelect('platform.category', 'category')
      .leftJoinAndSelect('platform.manufacturer', 'manufacturer')
      .leftJoinAndSelect('platform.originCountry', 'country')
      .leftJoinAndSelect('platform.weaponryDetails', 'weaponryDetails')
      .take(limit)
      .skip(offset)
      .getMany();
  }

  async findOne(id: number) {
    const result = await this.platformsRepository.findOne({
      where: { id },
      relations: [
        'category',
        'manufacturer',
        'originCountry',
        'weaponryDetails',
      ],
    });
    if (!result) {
      throw new NotFoundException(`Platform #${id} not found`);
    }
    return result;
  }

  async update(id: number, updatePlatformDto: UpdatePlatformDto) {
    const platformData = this.mapDtoToPlatform(updatePlatformDto);
    const platform = await this.platformsRepository.preload({
      id,
      ...platformData,
    });
    if (!platform) {
      throw new NotFoundException(`Platform #${id} not found`);
    }
    return this.platformsRepository.save(platform);
  }

  async remove(id: number) {
    const platform = await this.findOne(id);
    return this.platformsRepository.remove(platform);
  }
}
