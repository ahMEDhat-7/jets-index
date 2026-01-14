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
exports.EquipmentVariantsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const equipment_variant_entity_1 = require("./entities/equipment-variant.entity");
const equipment_service_1 = require("../equipment/equipment.service");
let EquipmentVariantsService = class EquipmentVariantsService {
    equipmentVariantRepository;
    equipmentService;
    constructor(equipmentVariantRepository, equipmentService) {
        this.equipmentVariantRepository = equipmentVariantRepository;
        this.equipmentService = equipmentService;
    }
    async create(createEquipmentVariantDto) {
        const equipment = await this.equipmentService.findOne(createEquipmentVariantDto.equipmentId);
        const variant = this.equipmentVariantRepository.create({
            name: createEquipmentVariantDto.name,
            role: createEquipmentVariantDto.role,
            equipment,
        });
        return this.equipmentVariantRepository.save(variant);
    }
    async findAll() {
        return this.equipmentVariantRepository.find({
            relations: ['equipment'],
        });
    }
    async findOne(id) {
        const variant = await this.equipmentVariantRepository.findOne({
            where: { id },
            relations: ['equipment'],
        });
        if (!variant) {
            throw new common_1.NotFoundException(`Equipment Variant with ID ${id} not found`);
        }
        return variant;
    }
    async update(id, updateEquipmentVariantDto) {
        const variant = await this.findOne(id);
        if (updateEquipmentVariantDto.equipmentId) {
            const equipment = await this.equipmentService.findOne(updateEquipmentVariantDto.equipmentId);
            updateEquipmentVariantDto['equipment'] = equipment;
        }
        Object.assign(variant, updateEquipmentVariantDto);
        return this.equipmentVariantRepository.save(variant);
    }
    async remove(id) {
        const variant = await this.findOne(id);
        return this.equipmentVariantRepository.remove(variant);
    }
};
exports.EquipmentVariantsService = EquipmentVariantsService;
exports.EquipmentVariantsService = EquipmentVariantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(equipment_variant_entity_1.EquipmentVariant)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        equipment_service_1.EquipmentService])
], EquipmentVariantsService);
//# sourceMappingURL=equipment-variants.service.js.map