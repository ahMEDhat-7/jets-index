import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentVariantsService } from './equipment-variants.service';

describe('EquipmentVariantsService', () => {
  let service: EquipmentVariantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipmentVariantsService],
    }).compile();

    service = module.get<EquipmentVariantsService>(EquipmentVariantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
