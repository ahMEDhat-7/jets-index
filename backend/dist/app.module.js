"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const countries_module_1 = require("./countries/countries.module");
const manufacturers_module_1 = require("./manufacturers/manufacturers.module");
const equipment_module_1 = require("./equipment/equipment.module");
const equipment_variants_module_1 = require("./equipment-variants/equipment-variants.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.env.${process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'}`,
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'postgres',
                    host: config.getOrThrow('DB_HOST'),
                    port: Number(config.getOrThrow('DB_PORT')),
                    username: config.getOrThrow('DB_USERNAME'),
                    password: config.getOrThrow('DB_PASSWORD'),
                    database: config.getOrThrow('DB_NAME'),
                    autoLoadEntities: true,
                    synchronize: config.getOrThrow('DB_SYNC'),
                    logging: config.getOrThrow('DB_LOGGING'),
                }),
            }),
            countries_module_1.CountriesModule,
            manufacturers_module_1.ManufacturersModule,
            equipment_module_1.EquipmentModule,
            equipment_variants_module_1.EquipmentVariantsModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map