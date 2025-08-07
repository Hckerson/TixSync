import { Test, TestingModule } from '@nestjs/testing';
import { GoedataResolver } from './goedata.resolver';
import { GoedataService } from './goedata.service';

describe('GoedataResolver', () => {
  let resolver: GoedataResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoedataResolver, GoedataService],
    }).compile();

    resolver = module.get<GoedataResolver>(GoedataResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
