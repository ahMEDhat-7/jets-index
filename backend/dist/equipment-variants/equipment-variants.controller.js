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
exports.EquipmentVariantsController = void 0;
const common_1 = require("@nestjs/common");
const equipment_variants_service_1 = require("./equipment-variants.service");
const create_equipment_variant_dto_1 = require("./dto/create-equipment-variant.dto");
const update_equipment_variant_dto_1 = require("./dto/update-equipment-variant.dto");
let EquipmentVariantsController = class EquipmentVariantsController {
    equipmentVariantsService;
    constructor(equipmentVariantsService) {
        this.equipmentVariantsService = equipmentVariantsService;
    }
    create(createEquipmentVariantDto) {
        return this.equipmentVariantsService.create(createEquipmentVariantDto);
    }
    findAll() {
        return this.equipmentVariantsService.findAll();
    }
    findOne(id) {
        return this.equipmentVariantsService.findOne(+id);
    }
    update(id, updateEquipmentVariantDto) {
        return this.equipmentVariantsService.update(+id, updateEquipmentVariantDto);
    }
    remove(id) {
        return this.equipmentVariantsService.remove(+id);
    }
};
exports.EquipmentVariantsController = EquipmentVariantsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_equipment_variant_dto_1.CreateEquipmentVariantDto]),
    __metadata("design:returntype", void 0)
], EquipmentVariantsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EquipmentVariantsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EquipmentVariantsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_equipment_variant_dto_1.UpdateEquipmentVariantDto]),
    __metadata("design:returntype", void 0)
], EquipmentVariantsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EquipmentVariantsController.prototype, "remove", null);
exports.EquipmentVariantsController = EquipmentVariantsController = __decorate([
    (0, common_1.Controller)('equipment-variants'),
    __metadata("design:paramtypes", [equipment_variants_service_1.EquipmentVariantsService])
], EquipmentVariantsController);
//# sourceMappingURL=equipment-variants.controller.js.map