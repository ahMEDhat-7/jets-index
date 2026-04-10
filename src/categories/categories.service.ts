import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoriesRepository.create(createCategoryDto);
    return this.categoriesRepository.save(category);
  }

  findAll(query: PaginationQueryDto) {
    const { limit = 20, offset = 0, search } = query;
    const qb = this.categoriesRepository.createQueryBuilder('category');

    if (search) {
      qb.where(
        'category.categoryName ILIKE :search OR category.categoryDomain ILIKE :search',
        { search: `%${search}%` },
      );
    }

    return qb
      .leftJoinAndSelect('category.platforms', 'platform')
      .take(limit)
      .skip(offset)
      .getMany();
  }

  async findOne(id: string) {
    const result = await this.categoriesRepository.findOne({
      where: { id },
      relations: ['platforms'],
    });
    if (!result) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return result;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesRepository.preload({
      id,
      ...updateCategoryDto,
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return this.categoriesRepository.save(category);
  }

  async remove(id: string) {
    const category = await this.findOne(id);
    return this.categoriesRepository.remove(category);
  }
}
