import { Test, TestingModule } from '@nestjs/testing';
import { PoiController } from './poi.controller';

describe('Poi Controller', () => {
  let controller: PoiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoiController],
    }).compile();

    controller = module.get<PoiController>(PoiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
