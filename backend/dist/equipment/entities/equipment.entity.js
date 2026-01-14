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
exports.Equipment = exports.EquipmentCategory = void 0;
const typeorm_1 = require("typeorm");
const manufacturer_entity_1 = require("../../manufacturers/entities/manufacturer.entity");
const equipment_variant_entity_1 = require("../../equipment-variants/entities/equipment-variant.entity");
var EquipmentCategory;
(function (EquipmentCategory) {
    EquipmentCategory["FIGHTER_JET"] = "fighter_jet";
    EquipmentCategory["BOMBER"] = "bomber";
    EquipmentCategory["DRONE"] = "drone";
    EquipmentCategory["HELICOPTER"] = "helicopter";
})(EquipmentCategory || (exports.EquipmentCategory = EquipmentCategory = {}));
let Equipment = class Equipment {
    id;
    name;
    category;
    generation;
    primaryRole;
    description;
    specs;
    advantages;
    manufacturer;
    variants;
};
exports.Equipment = Equipment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Equipment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Equipment.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'enum', enum: EquipmentCategory }),
    __metadata("design:type", String)
], Equipment.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Equipment.prototype, "generation", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Equipment.prototype, "primaryRole", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Equipment.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Equipment.prototype, "specs", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', array: true, nullable: true }),
    __metadata("design:type", Array)
], Equipment.prototype, "advantages", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => manufacturer_entity_1.Manufacturer, (m) => m.equipment, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", manufacturer_entity_1.Manufacturer)
], Equipment.prototype, "manufacturer", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => equipment_variant_entity_1.EquipmentVariant, (v) => v.equipment),
    __metadata("design:type", Array)
], Equipment.prototype, "variants", void 0);
exports.Equipment = Equipment = __decorate([
    (0, typeorm_1.Entity)('equipment')
], Equipment);
//# sourceMappingURL=equipment.entity.js.map