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
exports.ManufacturersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const manufacturers_service_1 = require("./manufacturers.service");
const create_manufacturer_dto_1 = require("./dto/create-manufacturer.dto");
const update_manufacturer_dto_1 = require("./dto/update-manufacturer.dto");
const pagination_dto_1 = require("../common/dto/pagination.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const user_entity_1 = require("../users/entities/user.entity");
let ManufacturersController = class ManufacturersController {
    manufacturersService;
    constructor(manufacturersService) {
        this.manufacturersService = manufacturersService;
    }
    create(createManufacturerDto) {
        return this.manufacturersService.create(createManufacturerDto);
    }
    findAll(paginationDto) {
        return this.manufacturersService.findAll(paginationDto);
    }
    findOne(id) {
        return this.manufacturersService.findOne(id);
    }
    update(id, updateManufacturerDto) {
        return this.manufacturersService.update(id, updateManufacturerDto);
    }
    remove(id) {
        return this.manufacturersService.remove(id);
    }
};
exports.ManufacturersController = ManufacturersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create manufacturer (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Manufacturer created' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_manufacturer_dto_1.CreateManufacturerDto]),
    __metadata("design:returntype", void 0)
], ManufacturersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all manufacturers with pagination' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all manufacturers' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], ManufacturersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get manufacturer by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return manufacturer' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Manufacturer not found' }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ManufacturersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update manufacturer (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Manufacturer updated' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Manufacturer not found' }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_manufacturer_dto_1.UpdateManufacturerDto]),
    __metadata("design:returntype", void 0)
], ManufacturersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete manufacturer (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Manufacturer deleted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Manufacturer not found' }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ManufacturersController.prototype, "remove", null);
exports.ManufacturersController = ManufacturersController = __decorate([
    (0, swagger_1.ApiTags)('manufacturers'),
    (0, common_1.Controller)('manufacturers'),
    __metadata("design:paramtypes", [manufacturers_service_1.ManufacturersService])
], ManufacturersController);
//# sourceMappingURL=manufacturers.controller.js.map