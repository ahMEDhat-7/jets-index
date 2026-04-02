import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { Country } from '../src/countries/entities/country.entity';
import { Manufacturer } from '../src/manufacturers/entities/manufacturer.entity';
import { Equipment } from '../src/equipment/entities/equipment.entity';
import { EquipmentVariant } from '../src/equipment-variants/entities/equipment-variant.entity';
import { User } from '../src/users/entities/user.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Country, Manufacturer, Equipment, EquipmentVariant, User],
          synchronize: true,
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('/api/v1');
    await app.init();
  });

  it('/api/v1/health (GET)', () => {
    return request(app.getHttpServer()).get('/api/v1/health').expect(200);
  });
});
