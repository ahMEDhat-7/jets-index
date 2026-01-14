"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEquipmentVariantDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_equipment_variant_dto_1 = require("./create-equipment-variant.dto");
class UpdateEquipmentVariantDto extends (0, mapped_types_1.PartialType)(create_equipment_variant_dto_1.CreateEquipmentVariantDto) {
}
exports.UpdateEquipmentVariantDto = UpdateEquipmentVariantDto;
//# sourceMappingURL=update-equipment-variant.dto.js.map