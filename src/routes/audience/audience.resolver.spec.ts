import { Test, TestingModule } from '@nestjs/testing';
import { AudienceResolver } from './audience.resolver';
import { AudienceService } from './audience.service';

describe('AudienceResolver', () => {
  let resolver: AudienceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AudienceResolver, AudienceService],
    }).compile();

    resolver = module.get<AudienceResolver>(AudienceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
