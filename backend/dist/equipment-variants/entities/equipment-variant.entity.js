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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentVariant = void 0;
const typeorm_1 = require("typeorm");
const equipment_entity_1 = require("../../equipment/entities/equipment.entity");
let EquipmentVariant = class EquipmentVariant {
    id;
    name;
    role;
    equipment;
};
exports.EquipmentVariant = EquipmentVariant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EquipmentVariant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EquipmentVariant.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EquipmentVariant.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => equipment_entity_1.Equipment, (e) => e.variants, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", equipment_entity_1.Equipment)
], EquipmentVariant.prototype, "equipment", void 0);
exports.EquipmentVariant = EquipmentVariant = __decorate([
    (0, typeorm_1.Entity)('equipment_variants')
], EquipmentVariant);
//# sourceMappingURL=equipment-variant.entity.js.map