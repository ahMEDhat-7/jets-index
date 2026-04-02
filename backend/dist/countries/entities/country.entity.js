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
exports.Country = void 0;
const typeorm_1 = require("typeorm");
const manufacturer_entity_1 = require("../../manufacturers/entities/manufacturer.entity");
const platform_entity_1 = require("../../platforms/entities/platform.entity");
let Country = class Country {
    id;
    name;
    isoCode;
    manufacturers;
    platforms;
};
exports.Country = Country;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'country_id' }),
    __metadata("design:type", Number)
], Country.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Country.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'iso_code', length: 3, unique: true, nullable: true }),
    __metadata("design:type", String)
], Country.prototype, "isoCode", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => manufacturer_entity_1.Manufacturer, (manufacturer) => manufacturer.headquartersCountry),
    __metadata("design:type", Array)
], Country.prototype, "manufacturers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => platform_entity_1.Platform, (platform) => platform.originCountry),
    __metadata("design:type", Array)
], Country.prototype, "platforms", void 0);
exports.Country = Country = __decorate([
    (0, typeorm_1.Entity)('countries')
], Country);
//# sourceMappingURL=country.entity.js.map