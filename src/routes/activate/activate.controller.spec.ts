import { Test, TestingModule } from '@nestjs/testing';
import { ActivateController } from './activate.controller';
import { ActivateService } from './activate.service';

describe('ActivateController', () => {
  let controller: ActivateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivateController],
      providers: [ActivateService],
    }).compile();

    controller = module.get<ActivateController>(ActivateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
