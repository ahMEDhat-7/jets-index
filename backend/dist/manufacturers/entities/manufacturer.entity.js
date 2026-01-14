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
exports.Manufacturer = void 0;
const typeorm_1 = require("typeorm");
const country_entity_1 = require("../../countries/entities/country.entity");
const equipment_entity_1 = require("../../equipment/entities/equipment.entity");
let Manufacturer = class Manufacturer {
    id;
    name;
    country;
    foundedYear;
    description;
    equipment;
};
exports.Manufacturer = Manufacturer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Manufacturer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Manufacturer.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => country_entity_1.Country, (c) => c.manufacturers, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", country_entity_1.Country)
], Manufacturer.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Manufacturer.prototype, "foundedYear", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Manufacturer.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => equipment_entity_1.Equipment, (e) => e.manufacturer),
    __metadata("design:type", Array)
], Manufacturer.prototype, "equipment", void 0);
exports.Manufacturer = Manufacturer = __decorate([
    (0, typeorm_1.Entity)('manufacturers')
], Manufacturer);
//# sourceMappingURL=manufacturer.entity.js.map