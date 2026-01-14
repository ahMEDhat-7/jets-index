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
exports.ManufacturersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const manufacturer_entity_1 = require("./entities/manufacturer.entity");
const countries_service_1 = require("../countries/countries.service");
let ManufacturersService = class ManufacturersService {
    manufacturerRepository;
    countriesService;
    constructor(manufacturerRepository, countriesService) {
        this.manufacturerRepository = manufacturerRepository;
        this.countriesService = countriesService;
    }
    async create(createManufacturerDto) {
        const country = await this.countriesService.findOne(createManufacturerDto.countryId);
        const manufacturer = this.manufacturerRepository.create({
            ...createManufacturerDto,
            country,
        });
        return this.manufacturerRepository.save(manufacturer);
    }
    async findAll() {
        return this.manufacturerRepository.find({
            relations: ['country', 'equipment'],
        });
    }
    async findOne(id) {
        const manufacturer = await this.manufacturerRepository.findOne({
            where: { id },
            relations: ['country', 'equipment'],
        });
        if (!manufacturer) {
            throw new common_1.NotFoundException(`Manufacturer with ID ${id} not found`);
        }
        return manufacturer;
    }
    async update(id, updateManufacturerDto) {
        const manufacturer = await this.findOne(id);
        if (updateManufacturerDto.countryId) {
            const country = await this.countriesService.findOne(updateManufacturerDto.countryId);
            updateManufacturerDto['country'] = country;
        }
        Object.assign(manufacturer, updateManufacturerDto);
        return this.manufacturerRepository.save(manufacturer);
    }
    async remove(id) {
        const manufacturer = await this.findOne(id);
        return this.manufacturerRepository.remove(manufacturer);
    }
};
exports.ManufacturersService = ManufacturersService;
exports.ManufacturersService = ManufacturersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(manufacturer_entity_1.Manufacturer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        countries_service_1.CountriesService])
], ManufacturersService);
//# sourceMappingURL=manufacturers.service.js.map