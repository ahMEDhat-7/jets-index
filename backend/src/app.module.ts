import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CountriesModule } from './countries/countries.module';
import { ManufacturersModule } from './manufacturers/manufacturers.module';
import { CategoriesModule } from './categories/categories.module';
import { PlatformsModule } from './platforms/platforms.module';
import { WeaponryDetailsModule } from './weaponry-details/weaponry-details.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.getOrThrow('DB_HOST'),
        port: Number(config.getOrThrow('DB_PORT')),
        username: config.getOrThrow('DB_USERNAME'),
        password: config.getOrThrow('DB_PASSWORD'),
        database: config.getOrThrow('DB_NAME'),
        autoLoadEntities: true,
        synchronize: config.getOrThrow<boolean>('DB_SYNC'),
        logging: config.getOrThrow<boolean>('DB_LOGGING'),
      }),
    }),
    CountriesModule,
    ManufacturersModule,
    CategoriesModule,
    PlatformsModule,
    WeaponryDetailsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
