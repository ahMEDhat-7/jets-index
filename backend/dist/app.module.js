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
const categories_module_1 = require("./categories/categories.module");
const platforms_module_1 = require("./platforms/platforms.module");
const app_controller_1 = require("./app.controller");
const blogs_module_1 = require("./blogs/blogs.module");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const health_module_1 = require("./health/health.module");
const stats_module_1 = require("./stats/stats.module");
const seeder_service_1 = require("./database/seeder.service");
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
            categories_module_1.CategoriesModule,
            platforms_module_1.PlatformsModule,
            blogs_module_1.BlogsModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            health_module_1.HealthModule,
            stats_module_1.StatsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [seeder_service_1.SeederService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map