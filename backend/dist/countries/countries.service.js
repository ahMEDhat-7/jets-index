"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const country_entity_1 = require("./entities/country.entity");
let CountriesService = class CountriesService {
    countryRepository;
    constructor(countryRepository) {
        this.countryRepository = countryRepository;
    }
    create(createCountryDto) {
        const country = this.countryRepository.create(createCountryDto);
        return this.countryRepository.save(country);
    }
    findAll(query) {
        const { limit = 20, offset = 0, search } = query;
        const qb = this.countryRepository.createQueryBuilder('country');
        if (search) {
            qb.where('country.name ILIKE :search', { search: `%${search}%` });
        }
        return qb
            .leftJoinAndSelect('country.manufacturers', 'manufacturer')
            .leftJoinAndSelect('country.platforms', 'platform')
            .take(limit)
            .skip(offset)
            .getMany();
    }
    async findOne(id) {
        const found = await this.countryRepository.findOne({
            where: { id },
            relations: ['manufacturers', 'platforms'],
        });
        if (!found) {
            throw new common_1.NotFoundException(`Country #${id} not found`);
        }
        return found;
    }
    async update(id, updateCountryDto) {
        const country = await this.countryRepository.preload({
            id,
            ...updateCountryDto,
        });
        if (!country) {
            throw new common_1.NotFoundException(`Country #${id} not found`);
        }
        return this.countryRepository.save(country);
    }
    async remove(id) {
        const country = await this.findOne(id);
        return this.countryRepository.remove(country);
    }
};
exports.CountriesService = CountriesService;
exports.CountriesService = CountriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(country_entity_1.Country)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], CountriesService);
//# sourceMappingURL=countries.service.js.map