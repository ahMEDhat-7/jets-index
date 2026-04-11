import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CountriesModule } from './countries/countries.module';
import { ManufacturersModule } from './manufacturers/manufacturers.module';
import { CategoriesModule } from './categories/categories.module';
import { PlatformsModule } from './platforms/platforms.module';
import { AppController } from './app.controller';
import { BlogsModule } from './blogs/blogs.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { StatsModule } from './stats/stats.module';
import { SeederService } from './database/seeder.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.getOrThrow<string>('DB_HOST'),
        port: config.getOrThrow<number>('DB_PORT'),
        username: config.getOrThrow<string>('DB_USERNAME'),
        password: config.getOrThrow<string>('DB_PASSWORD'),
        database: config.getOrThrow<string>('DB_NAME'),
        ssl: {
          rejectUnauthorized: true,
          ca: config.getOrThrow<string>('DB_CA'),
        },
        autoLoadEntities: true,
        synchronize: config.getOrThrow<boolean>('DB_SYNC'),
        logging: config.getOrThrow<boolean>('DB_LOGGING'),
      }),
    }),
    CountriesModule,
    ManufacturersModule,
    CategoriesModule,
    PlatformsModule,
    BlogsModule,
    UsersModule,
    AuthModule,
    HealthModule,
    StatsModule,
  ],
  controllers: [AppController],
  providers: [SeederService],
})
export class AppModule {}
