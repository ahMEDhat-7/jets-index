import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentVariantsController } from './equipment-variants.controller';
import { EquipmentVariantsService } from './equipment-variants.service';

describe('EquipmentVariantsController', () => {
  let controller: EquipmentVariantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipmentVariantsController],
      providers: [EquipmentVariantsService],
    }).compile();

    controller = module.get<EquipmentVariantsController>(EquipmentVariantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
