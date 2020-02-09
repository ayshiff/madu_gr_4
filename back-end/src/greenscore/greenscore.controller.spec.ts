import { Test, TestingModule } from '@nestjs/testing';
import { GreenscoreController } from './greenscore.controller';

describe('Greenscore Controller', () => {
  let controller: GreenscoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GreenscoreController],
    }).compile();

    controller = module.get<GreenscoreController>(GreenscoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
