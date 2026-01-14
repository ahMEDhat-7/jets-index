"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateManufacturerDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_manufacturer_dto_1 = require("./create-manufacturer.dto");
class UpdateManufacturerDto extends (0, mapped_types_1.PartialType)(create_manufacturer_dto_1.CreateManufacturerDto) {
}
exports.UpdateManufacturerDto = UpdateManufacturerDto;
//# sourceMappingURL=update-manufacturer.dto.js.map