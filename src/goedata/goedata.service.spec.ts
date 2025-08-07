import { Test, TestingModule } from '@nestjs/testing';
import { GoedataService } from './goedata.service';

describe('GoedataService', () => {
  let service: GoedataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoedataService],
    }).compile();

    service = module.get<GoedataService>(GoedataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
