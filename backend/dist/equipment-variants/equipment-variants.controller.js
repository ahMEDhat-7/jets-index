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
const swagger_1 = require("@nestjs/swagger");
const equipment_variants_service_1 = require("./equipment-variants.service");
const create_equipment_variant_dto_1 = require("./dto/create-equipment-variant.dto");
const update_equipment_variant_dto_1 = require("./dto/update-equipment-variant.dto");
const pagination_dto_1 = require("../common/dto/pagination.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const user_entity_1 = require("../users/entities/user.entity");
let EquipmentVariantsController = class EquipmentVariantsController {
    equipmentVariantsService;
    constructor(equipmentVariantsService) {
        this.equipmentVariantsService = equipmentVariantsService;
    }
    create(createEquipmentVariantDto) {
        return this.equipmentVariantsService.create(createEquipmentVariantDto);
    }
    findAll(paginationDto) {
        return this.equipmentVariantsService.findAll(paginationDto);
    }
    findOne(id) {
        return this.equipmentVariantsService.findOne(id);
    }
    update(id, updateEquipmentVariantDto) {
        return this.equipmentVariantsService.update(id, updateEquipmentVariantDto);
    }
    remove(id) {
        return this.equipmentVariantsService.remove(id);
    }
};
exports.EquipmentVariantsController = EquipmentVariantsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create equipment variant (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Equipment variant created' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_equipment_variant_dto_1.CreateEquipmentVariantDto]),
    __metadata("design:returntype", void 0)
], EquipmentVariantsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all equipment variants with pagination' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all equipment variants' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], EquipmentVariantsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get equipment variant by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return equipment variant' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Equipment variant not found' }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EquipmentVariantsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update equipment variant (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Equipment variant updated' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Equipment variant not found' }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_equipment_variant_dto_1.UpdateEquipmentVariantDto]),
    __metadata("design:returntype", void 0)
], EquipmentVariantsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete equipment variant (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Equipment variant deleted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Equipment variant not found' }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EquipmentVariantsController.prototype, "remove", null);
exports.EquipmentVariantsController = EquipmentVariantsController = __decorate([
    (0, swagger_1.ApiTags)('equipment-variants'),
    (0, common_1.Controller)('equipment-variants'),
    __metadata("design:paramtypes", [equipment_variants_service_1.EquipmentVariantsService])
], EquipmentVariantsController);
//# sourceMappingURL=equipment-variants.controller.js.map